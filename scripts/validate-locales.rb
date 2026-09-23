#!/usr/bin/env ruby
# Run after `bundle exec jekyll build`; verifies the two generated language editions.
require 'nokogiri'
require 'json'
require 'uri'
require 'yaml'
root = File.expand_path('..', __dir__)
site = File.join(root, '_site')
check = ->(condition, message) { abort("Localization check failed: #{message}") unless condition }
files = Dir.glob(File.join(site, '**/*.html'))
checked = 0
files.each do |file|
  doc = Nokogiri::HTML(File.read(file))
  payload = doc.at_css('#site-language-data')
  next unless payload
  data = JSON.parse(payload.content)
  lang = data.fetch('lang')
  check.call(doc.at_css('html')['lang'] == lang, "HTML language: #{file}")
  check.call(doc.css('[data-language-switch]').length == 2, "Language switch: #{file}")
  check.call(doc.css('.language-switch [aria-current]').length == 1, "Active language: #{file}")
  check.call(doc.css('link[rel=alternate][hreflang]').length == 3, "Alternate URLs: #{file}")
  doc.css('a[href]').each do |link|
    href = link['href']
    next unless href.start_with?('/') && !href.start_with?('//')
    path = href.split(/[?#]/).first
    next unless data['routes'].include?(path) || data['routes'].include?(path.sub(%r{^/ko}, ''))
    target = File.join(site, path.sub(%r{^/}, ''))
    target = File.join(target, 'index.html') if path.end_with?('/')
    check.call(File.file?(target), "Missing language route #{href} in #{file}")
    if lang == 'ko' && !link['data-language-switch']
      check.call(path.start_with?('/ko/'), "Navigation leaves Korean edition: #{href} in #{file}")
    end
  end
  checked += 1
end
%w[en ko].each do |lang|
  dir = lang == 'en' ? site : File.join(site, 'ko')
  papers = Nokogiri::HTML(File.read(File.join(dir, 'publications/index.html')))
  check.call(papers.css('.research-area-badge').length == 38, "Missing papers in #{lang}")
  check.call(papers.css('input[placeholder="Type to filter"]').empty?, "Filter returned in #{lang}")
  teaching = Nokogiri::HTML(File.read(File.join(dir, 'teaching/index.html')))
  terms = teaching.css('.course-term')
  courses = YAML.load_file(File.join(root, '_data/courses.yml'))
  check.call(terms.length == courses.length, "Missing course terms in #{lang}")
  courses.each_with_index do |term, index|
    actual_codes = terms[index].css('tr').map { |row| row.at_css('td').text.strip }
    check.call(actual_codes == term['courses'].map { |c| c['code'] }, "Course codes changed in #{lang}: #{term['term']}")
  end
  news = Nokogiri::HTML(File.read(File.join(dir, 'news/index.html')))
  check.call(news.css('.news tr').length == Dir.glob(File.join(root, '_news/*.md')).length, "Missing news in #{lang}")
end
check.call(checked >= 26, 'Missing bilingual main pages')
puts "Localization OK: #{checked} pages; routes, language metadata, publications, courses and news verified."
