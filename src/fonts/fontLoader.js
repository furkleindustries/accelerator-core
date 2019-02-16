(function () {
  var docElem = document.documentElement;
  var classes = 'fonts-stage-1 fonts-stage-2';
  var classesWithSpace = ' ' + classes;

  // Optimization for Repeat Views
  if (sessionStorage && sessionStorage.criticalFoftDataUriFontsLoaded) {
    console.log('Fonts already loaded.');
    docElem.className += docElem.className ? classesWithSpace : classes;
    return;
  }

  function loadSingleFont(fontLoader) {
    return fontLoader.load().then(
      function () {},
      function (err) {
        console.error('Font loading encountered an error:', err);
      },
    );
  }

  function loadFullFonts(subsetSuccess) {
    console.log('Font subset loading succeeded? ' + subsetSuccess);

    if (subsetSuccess) {
      docElem.className += docElem.className ? classesWithSpace : classes;
    }

    var promises = %fontsToLoad%.reduce(function (arr, font) {
      if (typeof font === 'string') {
        return arr.concat([ loadSingleFont(new FontFaceObserver(font)) ]);
      }

      if (font || !font.family) {
        throw new Error(
          'No font or font family provided in accelerator.config.js ' +
            'fonts entry.',
        );
      }

      var family = font.family;
      var styles = font.styles || [];
      var weights = font.weights || [];

      return arr.concat(styles.reduce(function (arr, style) {
        return arr.concat(weights.reduce(function (arr, weight) {
          return arr.concat([
            loadSingleFont(new FontFaceObserver(family, {
              style: (style || 'normal').toLowerCase(),
              weight: (weight || 'normal').toLowerCase(),
            })),
          ]);
        }, []));
      }, []));
    }, []);

    Promise.all(promises).then(
      function () {
        docElem.className += docElem.className ?
          ' fonts-stage-2' :
          'fonts-stage-2';

        // Optimization for Repeat Views
        sessionStorage.criticalFoftDataUriFontsLoaded = true;
      },
      function (err) { console.error(err) },
    );
  };

  %subsetFontConditionalStatement%
})();
