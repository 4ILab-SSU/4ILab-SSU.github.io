#!/usr/bin/env ruby
# Run AFTER minification/PurgeCSS: URL versions must describe deployed bytes.
require_relative 'lib/site_assets'
root = File.expand_path(ARGV[0] || '../_site', __dir__)
count = 0
Dir.glob(File.join(root, '**/*.html')).each do |file|
  next if file.start_with?(File.join(root, 'assets') + '/')
  doc = Nokogiri::HTML(File.read(file))
  changed = false
  doc.css('script[src], link[rel="stylesheet"][href]').each do |node|
    attr = node.name == 'script' ? 'src' : 'href'
    target = SiteAssets.local_path(root, node[attr], from: file.delete_prefix(root + '/'))
    next unless target && File.file?(target)
    next unless %w[.css .js].include?(File.extname(target))
    node[attr] = SiteAssets.versioned_url(node[attr], target)
    changed = true
    count += 1
  end
  File.write(file, doc.to_html) if changed
end
puts "Asset versions finalized: #{count} local CSS/JS references."
