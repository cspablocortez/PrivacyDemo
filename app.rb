require 'sinatra'

set :bind, '0.0.0.0'

get '/' do
  erb <<~ERB
  <h1>Hello, World!</h1>
  <p>This is the index page of your application.</p>
  ERB
end

get '/:name' do
  @name = params[:name] # params = array 
  erb :user_data
end

