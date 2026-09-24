# The theme's cache-bust gem hashes assets/_sass, but this site uses _sass.
# Include local and theme inputs so browsers refresh main.css after a style edit.
require 'jekyll-cache-bust'
require 'digest'

module Jekyll
  module CacheBust
    def bust_css_cache(file_name)
      site = @context.registers[:site]
      roots = [site.source]
      roots << site.theme.root if site.theme
      files = roots.flat_map do |root|
        Dir.glob(File.join(root, '_sass', '**', '*.{scss,sass,css}')) +
          Dir.glob(File.join(root, 'assets', 'css', '**', '*.{scss,sass,css}'))
      end
      files += %w[_config.yml Gemfile.lock purgecss.config.js].map { |name| File.join(site.source, name) }
      digest = Digest::SHA256.new
      files.select { |path| File.file?(path) }.uniq.sort.each do |path|
        digest.update(File.basename(path)).update("\0").update(File.binread(path)).update("\0")
      end
      separator = file_name.include?('?') ? '&' : '?'
      "#{file_name}#{separator}v=#{digest.hexdigest[0, 16]}"
    end
  end
end
