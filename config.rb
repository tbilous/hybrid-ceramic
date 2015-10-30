require 'compass/import-once/activate'
require 'autoprefixer-rails'

# Require any additional compass plugins here.

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "img"
javascripts_dir = "scripts"
sourcemap     = true
#output_style  = :compressed
sass_options  = { cache: false }
line_comments = false

on_stylesheet_saved do |file|
  css = File.read(file)
  map = file + '.map'

  if File.exists? map
    result = AutoprefixerRails.process(css, {
        map:   File.read(map),
        from: file,
        to:   file})
    result.map
  else
    File.open(file, 'w') { |io| io << AutoprefixerRails.process(css) }
  end
end
