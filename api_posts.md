---
layout: null
permalink: /api/all
pagination:
  permalink: ''
  enabled: true
  per_page: 4
  collection: all
  extension: .json
  indexpage: 'feed-:num'
---

{
  "pages": [{% for post in paginator.posts %}
    {% if forloop.first != true %},{% endif %}
    {
      "title": "{{ post.title }}",
      "link": "{{ post.url }}",
      "tags": "{{ post.tags }}",
      "description": "{{ post.description }}",
      "univers": "{{ post.univers }}",
      "date": "{{post.date}}"
    }{% endfor %}
  ]
}