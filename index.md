---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
title: Freshbits Web Solution
desc: 'Setting your meta keywords and descriptions will have an impact n'
keywords: "jekyll, meta, keywords, description, seo, tutorial, automate, Dave McNally, davemcnally"
paginate: true
---


---
---
{{ page.title }}

{% for post in paginator.posts %}
    {{ post.title }}
{% endfor %}

{% include paginator_data.html %}
