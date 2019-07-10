Rails.application.routes.draw do
  resources :comparison_items, only: [:index, :show, :create, :update]
  resources :items, only: [:index, :show, :create, :update, :destroy]
  resources :users, only: [:create, :update]


  get '/users/:name', to: 'users#show'


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
