#!/usr/bin/env ruby
# Validate the artifact that will actually be deployed, including final asset hashes.
require_relative 'lib/site_assets'
require 'json'
require 'set'
root = File.expand_path(ARGV[0] || '../_site', __dir__)
errors = Set.new
files = Dir.glob(File.join(root, '**/*.html')).reject { |f| f.start_with?(File.join(root, 'assets') + '/') }
abort 'Site validation failed: no built HTML pages.' if files.empty?
files.each do |file|
  name = file.delete_prefix(root + '/')
  doc = Nokogiri::HTML(File.read(file))
  doc.css('[id]').map { |n| n['id'] }.tally.each { |id, count| errors << "#{name}: duplicate id #{id}" if count > 1 }
  doc.css('a[href], img[src], script[src], link[href]').each do |node|
    url = node['href'] || node['src']
    target = SiteAssets.local_path(root, url, from: name)
    next unless target
    unless File.file?(target)
      errors << "#{name}: missing local file #{url}"
      next
    end
    if node.name == 'script' || (node.name == 'link' && node['rel'] == 'stylesheet')
      next unless %w[.css .js].include?(File.extname(target))
      version = URI.decode_www_form(URI.parse(url).query.to_s).to_h['v']
      errors << "#{name}: stale asset version #{url}" unless version == SiteAssets.fingerprint(target)
    end
  end
  doc.css('script[type="application/json"]').each do |node|
    JSON.parse(node.content)
  rescue JSON::ParserError => error
    errors << "#{name}: invalid JSON #{node['id']}: #{error.message}"
  end
end
abort errors.to_a.join("\n") unless errors.empty?
puts "Site OK: #{files.length} pages; local links/assets, unique IDs, JSON and final CSS/JS versions verified."
