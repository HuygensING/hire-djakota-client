### v2.1.1	(2016/8/1 7:40)
* New build
* New build

### v2.1.0	(2016/6/28 12:59)
* Refactor Djatoka client
* New build
* Add viewer dir
* WiP

### v2.0.0	(2016/6/2 10:54)
* Bump packages
* Fix errors caused by bumping React to 15.0.1

### v1.13.0	(2016/4/21 9:32)
* Update view when config changes
* Create new API when receiving next props
* Unscribe when client unmounts
* Remove call to undefined function
* Remove console.log
* Modernize structure
* added 2 tests for receiveNewState
* introduced shrinkwrap
* added (pending) unit tests for viewer component
* added unit test for DjatokaClient, added pending integration tests for viewer
* added test for touchmove on viewer
* added tests for widthFill and heightFill
* tests for viewer mousewheel handler
* new standalone release 1.12.0

### v1.12.0	(2015/10/1 12:51)
* fixed superfluous calls to onAnimationFrame when component is unmounted by aborting new calls of requestAnimationFrame
* added canvas rendering spy to viewer test
* test mouse drag on viewer
* 2nd attempt framerate test for viewer
* added tests for viewer
* added tests for viewer
* tests for touch events on zoom component and rerendering on zoom component
* more integration tests
* more integration tests
* stubbed api makeTileUrl func for test
* integration test for zoom component
* using browserify karma plugin for integration tests
* new standalone release 1.11.0
* retry release
* new standalone release 1.11.0

### v1.11.0	(2015/9/29 9:3)
* prepare release
* retry the travis thing
* attempt 6
* attempt 4 at travis
* attempt 4 at travis
* attempt 4 at travis
* attempt 3 at travis
* second attempt with karma
* second attempt with karma
* first attempt at karma runner on travis ci
* fix release script
* new standalone release 1.10.0

### v1.10.0	(2015/9/28 10:0)
* only draw to canvas when new image tiles are being loaded or new position is passed
* moved upScale and downScale to utility functions
* dropped some standalone releases
* new standalone release 1.9.0

### v1.9.0	(2015/9/25 10:5)
* removed alert whoopsie
* new standalone release 1.8.0

### v1.8.0	(2015/9/25 9:56)
* removed inline styling from zoom
* release strategies
* new standalone release 1.7.0
* new standalone release 1.7.0
* new standalone release 1.7.0
* new standalone release 1.7.0
* new standalone release 1.7.0
* new standalone release 1.7.0

### v1.7.0	(2015/9/24 15:48)
* new standalone release 1.6.0
* new standalone release 1.6.0

### v1.6.0	(2015/9/24 15:39)
* trying out release

### v1.5.0	(2015/9/24 14:20)
* autoFill now uses image dimensions

### v1.4.0	(2015/9/24 14:6)


### v1.3.0	(2015/9/24 14:2)
* added free movement toggle

### v1.2.0	(2015/9/24 13:44)
* fix before all hook
* set freeMovement in internal state in stead of props; provide callback on minimap dimensions
* moved unit tests to test/unit
* moved unit tests to test/unit
* removed object assignment call in favour of spread operators in makeTileUrl, added tests for makeTiles
* added tests for constructor
* async test for onTileLoad
* removed timestamp opt from tile spec, added tests for fetchTile
* added test for getStart
* added tests for findLevelForScale
* extra test for zoomTo
* reduced superfluous calls to parseInt and superfluous params in zoomTo, added tests for zoomBy and zoomTo
* reduced superfluous calls to parseInt and superfluous params in zoomTo, added tests for zoomBy and zoomTo
* tests for getRealImagePos; reduced redundant multiplications
* test fullZoom
* test for autoFill, heightFill and widthFill
* travis icon in readme
* first test
* removed log message
* code cleanup, pending test
* added pending tests, removed superfluous arg from api.js

### v1.1.1	(2015/9/18 11:27)
* small fix with elem top and left

### v1.1.0	(2015/9/18 11:17)
* set focal point to cursor pos on wheel
* fix #2, zoom around focal point which is center of canvas. next set focal point to cursor pos/pinch center

### v1.0.1	(2015/9/17 12:27)
* readme updated

### v1.0.0	(2015/9/17 12:4)


undefined