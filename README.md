# Instagram clone by [@zaharzagrava](https://twitter.com/zaharzagrava)

## General

Technologies:

- Docker, docker-compose
- yarn workspaces

## How to use

The main idea of the project is to spin up all additional services (e.g. postgres, redis) using docker-compose, as well as create one additional empty docker container that mounts (using [Docker bind mount](https://docs.docker.com/storage/bind-mounts/)) to the project root directory. This empty container does nothing, technically his Docker run command is `command: bash -c "yarn run knex:install && sleep infinity"`. You enter this container and run anything you want inside it (start your api / web / expo, start watching your jest tests, start your storybook) in any order. Since you are in a Docker container and all your additional services (e.g. postgres) also run inside docker, you have a completely isolated development envrionment that is identical between all your colleagues that work on the project.

List of commands after clone:

- open new terminal (I tested in bash, but should work in others as well)
- `npm run up` (spin up additional services + waiting container)
- open new terminal
- `npm run exec` (find your waiting container and enter it)
- Run any command you like
  - Example #1. To start a frontend along with api, run `npm run start:web` then open new terminal, run `npm run exec` again to start a new session with your waiting container, then run `npm run start:api`.

## License

MIT License

Copyright (c) 2020 Ruslan Plastun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
