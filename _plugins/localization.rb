# Two static language editions from one set of pages and shared research data.
require 'nokogiri'
module LabLocalization
  JS_MESSAGES = [
    '잠정', '공식 공지 날짜 기준', '등록된 향후 일정이 없습니다. 아래 공식 페이지에서 새 공지를 확인하세요.',
    '한국', '발표/마감 시각은 공식 공지 확인', '장', '개 앨범', '앨범 열기',
    '지도 배경을 불러오지 못했습니다. 장소 목록의 앨범 링크는 계속 이용할 수 있습니다.',
    '전체 장소 · 핀의 숫자는 연결된 앨범 수입니다.',
    '선택됨 · 지도 팝업 또는 아래 목록에서 앨범을 열 수 있습니다.'
  ].freeze
  def self.normalize(text)
    text.to_s.gsub(/[[:space:]\u00a0]+/, ' ').strip
  end
  def self.translate(value, dictionary)
    return value unless value.is_a?(String)
    translated = dictionary[normalize(value)]
    # Image captions combine an album name with a photo number.
    if !translated && value.include?(' — ')
      prefix, suffix = value.split(' — ', 2)
      translated = dictionary[normalize(prefix)] + ' — ' + suffix if dictionary[normalize(prefix)]
    end
    translated ? value.sub(/\S(?:.*\S)?/m, translated) : value
  end
  def self.translate_tree(value, dictionary)
    case value
    when Hash then value.transform_values { |v| translate_tree(v, dictionary) }
    when Array then value.map { |v| translate_tree(v, dictionary) }
    when String then dictionary[normalize(value)] || value
    else value
    end
  end
  class Generator < Jekyll::Generator
    safe true
    priority :low
    def generate(site)
      originals = site.pages.select { |p| p.path.start_with?('_pages/') && p.data['permalink'] && !p.data['redirect'] }
      originals += site.collections.fetch('news').docs if site.collections['news']
      routes = originals.map(&:url).uniq
      site.config['localized_routes'] = routes
      originals.each do |source|
        source.data['lang'] = 'en'
        source.data['language_path'] = source.url
        source.data['localized'] = true
        localized = Jekyll::PageWithoutAFile.new(site, site.source, 'ko', File.basename(source.path))
        localized.content = site.data.fetch('news_ko', {}).fetch(File.basename(source.path), source.content).dup
        localized.data = source.data.dup.merge('lang' => 'ko', 'permalink' => '/ko' + source.url, 'nav' => false, 'sitemap' => true)
        site.pages << localized
      end
    end
  end
  def self.render(page)
    return unless page.data['localized'] && page.output.include?('<html')
    site = page.site
    lang = page.data['lang']
    dictionary = site.data.fetch('i18n', {}).fetch(lang, {})
    html = Nokogiri::HTML(page.output)
    html.at_css('html')['lang'] = lang
    # Text and accessibility labels only. Never alter code, scripts, IDs or bibliography metadata.
    html.xpath('//text()[not(ancestor::script or ancestor::style or ancestor::pre or ancestor::code)]').each do |node|
      node.content = translate(node.text, dictionary)
    end
    html.css('[title], [alt], [aria-label], [placeholder]').each do |node|
      %w[title alt aria-label placeholder].each { |attr| node[attr] = translate(node[attr], dictionary) if node[attr] }
    end
    if (title = html.at_css('title'))
      title.content = title.text.split(' | ').map { |part| dictionary[normalize(part)] || part }.join(' | ')
    end
    html.css('[lang]').each { |node| node['lang'] = lang unless node['data-preserve-language'] }
    # Show local names first on Korean People pages without duplicating member records.
    if lang == 'ko'
      html.css('.member-card').each do |card|
        name, local = card.at_css('.member-name'), card.at_css('.member-name-ko')
        next unless name && local
        english = name.text.delete('⭐').strip
        name.content = (name.text.include?('⭐') ? '⭐ ' : '') + local.text
        local.content = english
      end
    else
      html.css('.hero-korean-name').each(&:remove)
    end
    routes = site.config['localized_routes']
    html.css('a[href]').each do |link|
      next if link['data-language-switch']
      href = link['href']
      path, suffix = href.split(/(?=[?#])/, 2)
      link['href'] = '/ko' + path + suffix.to_s if lang == 'ko' && routes.include?(path)
    end
    # Translate structured data consumed by the interactive calendar and photo map.
    html.css('#conference-data, #photo-map-data').each do |node|
      node.content = JSON.generate(translate_tree(JSON.parse(node.content), dictionary)).gsub('</', '<\/')
    end
    path = page.data['language_path']
    head = html.at_css('head')
    %w[en ko x-default].each do |locale|
      link = Nokogiri::XML::Node.new('link', html)
      link['rel'] = 'alternate'; link['hreflang'] = locale
      link['href'] = site.config['url'] + (locale == 'ko' ? '/ko' : '') + path
      head.add_child(link)
    end
    html.css('meta[name="description"], meta[property="og:description"], meta[property="og:title"]').each do |node|
      node['content'] = translate(node['content'], dictionary)
    end
    payload = Nokogiri::XML::Node.new('script', html)
    payload['type'] = 'application/json'; payload['id'] = 'site-language-data'
    payload.content = JSON.generate({lang: lang, messages: dictionary.slice(*JS_MESSAGES), routes: routes}).gsub('</', '<\/')
    html.at_css('body').add_child(payload)
    page.output = html.to_html
  end
end
Jekyll::Hooks.register [:pages, :documents], :post_render do |page|
  LabLocalization.render(page)
end
