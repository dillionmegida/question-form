# question-form

React component for adding exercise questions to webpages or blogs.

[![NPM](https://img.shields.io/npm/v/question-form.svg)](https://www.npmjs.com/package/question-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save question-form
```

## Usage

This component requires a `questions` prop of type array. The required format of the questions array is:

```js
[
    {
        name: 'What is React?',
        options: [
            "React is this",
            "React is that",
            "React is cool"
        ],
        answer: 0
    },
    {
        name: 'What is science?',
        ...
    },
    ...
]
```

Result:

![](image)

Every question should be in form of objects with three keys: question (`string`), options (`array`) and answer (`number`) which is the index of the answer in the options array.

### Example

```jsx
import React, { Component } from 'react'

import QuestionForm from 'question-form'
import 'question-form/dist/index.css'

const Page = () => {
    const questions = [{
        name: 'What is React?',
        options: [
            "React is this",
            "React is that",
            "React is cool"
        ],
        answer: 0
    },...]

    return (
        <QuestionForm questions={questions}>
    )
}
```

### Use case - markdown blog posts

This component can be used in any framework that allows querying of markdown posts. Basically, the questions array would be added to the frontmatter of the markdown, and on querying, this component can be used with the questions property of the frontmatter assigned to the `questions` prop.

This example uses a [Gatsby]() Blog.

In the post markdown file:

```md
---
title: "Post title"
questions:
    [
        {
            name: "What is React?",
            options: ["React is this", "React is that", "React is cool"],
            answer: 0,
        },
        ...,
    ]
---

...
```

Wherever you query your post, you could add the following: (using the gatsby-starter post query format)

```jsx
import React from 'react'
import QuestionForm from 'question-form'
---
export default ({data}) => {
    const {frontmatter: {title, questions}} = data.markdownRemark;
    return (
        <div>
            <h1>Title</h1>
            <QuestionForm questions={questions}>
        </div>
    )
}
---
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        title
        questions {
            name
            options
            answer
        }
      }
    }
  }
`

```

## Issues and Contributions

Your contribution to this project would be highly appreciated. Could be a documentation issue, pull request, feature request, they are all welcome.

-   [Create a pull request](https://github.com/dillionmegida/question-form/pulls)
-   [Open an issue](https://github.com/dillionmegida/question-form/issues)

## Users

- [My personal blog](https://dillionmegida.com)
- [TheWebFor5](https://thewebfor5.com)

## License

MIT © [dillionmegida](https://github.com/dillionmegida)
