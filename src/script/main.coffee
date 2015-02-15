require.config({
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery'
  }
})
require(['jquery'],
  (
    $
  )->
    console.log($)
)
