[![Actions Status](https://github.com/vetneka/frontend-project-lvl4/workflows/hexlet-check/badge.svg)](https://github.com/vetneka/frontend-project-lvl4/actions)
[![Build Status](https://github.com/vetneka/frontend-project-lvl3/workflows/build/badge.svg)](https://github.com/vetneka/frontend-project-lvl4/actions/workflows/build.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/021f2c39e2b0d3646b12/maintainability)](https://codeclimate.com/github/vetneka/frontend-project-lvl4/maintainability)

# Hexlet-chat
> study project at hexlet.io

## Overview
[Hexlet-chat](https://slack-26691.herokuapp.com/) is a simple real-time chat application.

<p align="center">
  <img src="https://user-images.githubusercontent.com/44982805/127958485-35fccc31-3b39-484d-a9f5-d75740ba9cc9.png" height="300">
  <img src="https://user-images.githubusercontent.com/44982805/127957625-7b5516bf-62a3-46fe-abb1-d73c3f9300c8.png" height="300">
</p>

## Features
- Registration and authorization. The project has a small server that supports [JWT](https://jwt.io/) technology.
- Create, rename and delete channels. These operations take place inside modals.
- Create and receive messages. Implemented via [websockets](https://socket.io/).
- All forms validation and error handling. Used by [formik](https://formik.org/).

<p align="center">
  <img src="https://user-images.githubusercontent.com/44982805/127960250-759d828c-3e78-4cd7-a5cd-72cac741ccf2.png" height="150">
  <img src="https://user-images.githubusercontent.com/44982805/127960254-8d8f06db-08dc-4db5-b1c0-716aeedadbaa.png" height="150">
  <img src="https://user-images.githubusercontent.com/44982805/127960260-5a15c14f-b487-4cbc-8f2a-c2b3f2587064.png" height="150">
  <img src="https://user-images.githubusercontent.com/44982805/127960266-a5fa6b33-65d1-4af1-a153-bf7b4215b8bd.png" height="150">
</p>

## Tech Stack
- [React (with hooks)](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [React-Bootstrap v2](https://react-bootstrap.github.io/), [socket.io](https://socket.io/), [formik](https://formik.org/), [i18next](https://react.i18next.com/)
- [ESLint](https://eslint.org/), [Webpack v5](https://webpack.js.org/), [Heroku](https://heroku.com/), [Rollbar](https://rollbar.com/)


## Requirements
- [node.js](https://nodejs.org/) >= v14
- [npm](https://www.npmjs.com/) >= v6
- [make](https://www.gnu.org/software/make/) >= v4
- [git](https://git-scm.com/) >= v2.28
- [heroku cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

## Installation and Usage

### Online:
[Hexlet-chat (demo)](https://slack-26691.herokuapp.com/)

By default available two users:
```
1) admin/admin
2) hexlet/hexlet
```

### Locally
```
$ git clone git@github.com:vetneka/frontend-project-lvl4.git
$ make install
$ make start
```
<hr>
<p align="center"><sup>@2021</sup></p>
