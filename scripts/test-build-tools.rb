#!/usr/bin/env ruby
require 'jekyll'
require 'tmpdir'
require 'fileutils'
require 'json'
require_relative 'lib/site_assets'
require_relative '../_plugins/css_cache_bust'

def check(value, message)
  raise message unless value
end
Dir.mktmpdir do |root|
  FileUtils.mkdir_p(File.join(root, '_sass'))
  file = File.join(root, '_sass', '_lab.scss')
  File.write(file, '.section { margin-top: 0; }')
  filter = Object.new.extend(Jekyll::CacheBust)
  site = Struct.new(:source, :theme).new(root, nil)
  filter.instance_variable_set(:@context, Liquid::Context.new({}, {}, {site: site}))
  before = filter.bust_css_cache('/assets/css/main.css')
  check(before == filter.bust_css_cache('/assets/css/main.css'), 'CSS version must be stable')
  File.write(file, '.section { margin-top: 88px; }')
  check(before != filter.bust_css_cache('/assets/css/main.css'), 'Changing _sass must change the version')
  url = SiteAssets.versioned_url('/main.css?other=1&v=old#part', file)
  check(url.include?('other=1') && url.end_with?('#part'), 'Preserve URL query and fragment')
  check(SiteAssets.versioned_url(url, file) == url, 'Finalization must be idempotent')
  File.write(file, '/* purged output */')
  check(SiteAssets.versioned_url(url, file) != url, 'Final versions must change with deployed bytes')
  check(SiteAssets.local_path(root, '#section', from: 'ko/projects/index.html') == File.join(root, 'ko/projects/index.html'), 'Same-page anchors must keep their directory')
  check(SiteAssets.local_path(root, 'https://example.com/style.css').nil?, 'External assets must be untouched')
  check(SiteAssets.local_path(root, '/../../outside').nil?, 'Paths must stay inside the built site')
end

# Embedded JSON must survive user-authored text containing a script closing tag.
source = %q({{ value | jsonify | replace: '<', '\u003c' }})
value = { 'title' => '</script><script>example</script>' }
encoded = Liquid::Template.parse(source).render({ 'value' => value }, filters: [Jekyll::Filters])
check(!encoded.include?('<'), 'Inline JSON must escape HTML tag openings')
check(JSON.parse(encoded) == value, 'Escaping must preserve the original data')

puts 'Build tooling regression checks passed.'
