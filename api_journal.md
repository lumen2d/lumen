---
layout: null
permalink: /api/journal
pagination:
  permalink: ''
  enabled: true
  per_page: 5
  collection: journal
  extension: .json
  indexpage: 'feed-:num'
---

{
  "pages": [{% for post in paginator.posts %}
    {% if forloop.first != true %},{% endif %}
    {
      "title": "{{ post.title }}",
      "link": "{{ post.url }}",
      "img": "{{ post.img }}",
      "description": "{{ post.description }}",
      "author": "{{ post.author }}"
    }{% endfor %}
  ]
}