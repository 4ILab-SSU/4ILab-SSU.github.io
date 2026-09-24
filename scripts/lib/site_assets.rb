require 'digest'
require 'uri'
require 'nokogiri'

module SiteAssets
  module_function

  def local_path(root, url, from: 'index.html')
    return if url.nil? || url.empty? || url.start_with?('//') || url.match?(/\A[a-z][a-z0-9+.-]*:/i)
    path = URI::DEFAULT_PARSER.unescape(url.split(/[?#]/, 2).first.to_s)
    path = '/' + from if path.empty?
    file = File.expand_path(path.start_with?('/') ? ".#{path}" : File.join(File.dirname(from), path), root)
    return unless file.start_with?(root + '/')
    File.directory?(file) ? File.join(file, 'index.html') : file
  end

  def fingerprint(file)
    Digest::SHA256.file(file).hexdigest[0, 16]
  end

  def versioned_url(url, file)
    uri = URI.parse(url)
    query = URI.decode_www_form(uri.query.to_s).reject { |key, _| key == 'v' }
    uri.query = URI.encode_www_form(query + [['v', fingerprint(file)]])
    uri.to_s
  end
end
