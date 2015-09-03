# satellite

> Node.js server for providing build status badges for GitHub branches.

Used by [Buildasaur](https://github.com/czechboy0/Buildasaur), [XcodeServerSDK](https://github.com/czechboy0/XcodeServerSDK) and other projects backed by Xcode Server to show a build status badge like the ones coming from hosted CI services. Since Xcode Server is self-hosted, if you use [Buildasaur](https://github.com/czechboy0/Buildasaur) to sync your build results from Xcode Server to GitHub, you can take advantage of Satellite to get a badge of your own.

- Runs on [`https://stlt.herokuapp.com/`](https://stlt.herokuapp.com/)

# :nut_and_bolt: usage
Just add a badge like this to your README and **satellite** will return the right badge - by going to GitHub and checking the [GitHub status](https://developer.github.com/v3/repos/statuses/) (you know, those little green tickmarks and Pull Request statuses) - and returning the appropriate badge.

Add this to your README:
```
[![satellite badge](https://stlt.herokuapp.com/v1/badge/USER/REPO/BRANCH)](https://github.com/USER/REPO/branches)
```
If you don't specify a branch, *master* will be used.

# API
The whole service just has one endpoint

## `/v1/badge/:USER/:REPO/:BRANCH?`
And since the service is running on `https://stlt.herokuapp.com`, an example call would be

```
HTTP GET https://stlt.herokuapp.com/v1/badge/czechboy0/xcodeserversdk/swift-2
```
which returns an SVG image of the badge.

# details
The service uses [Redis](http://redis.io) for caching of the status (1 minute) and of the badge image data (1 hour).

# :white_check_mark: installation
There is an instance running at `https://stlt.herokuapp.com`, but you can also run your own if you want.
Clone the repo and run `npm install` and then start the server locally with `./bin/www`. 
Or, deploy it to your heroku account: [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

# :gift_heart: Contributing
Please create an issue with a description of a problem or a pull request with a fix.

# :v: License
MIT

# :alien: Author
Honza Dvorsky - http://honzadvorsky.com, [@czechboy0](http://twitter.com/czechboy0)