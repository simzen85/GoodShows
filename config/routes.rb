Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  root to: 'static_pages#index'

  namespace :api, defaults: { format: :json }  do
    resources :users, only: [:show, :update, :index] do
      member do
        get :friends
        get :feed
      end
    end
    get '/profile', to: 'users#show'
    resources :show_shelves, only: [:show, :index, :create, :destroy]
    get '/show_shelves_all', to: 'show_shelves#all_shelf'
    resources :shows, only: [:show, :index]
    resources :reviews, only: [:index, :create, :show, :destroy, :update]
    resources :show_shelvings, only: [:create, :destroy]
    resources :friendships, only: [:destroy]
    get '/friends', to: 'users#friends'
    get '/feed', to: 'home_feed#index'
    post '/reviews/:id/comment', to: 'reviews#comment'
    resources :friend_requests, only: [:index, :destroy]
    resources :friend_proposals, only: [:index, :destroy, :create]
    post '/friend_requests', to: 'friend_requests#accept'
    delete '/remove_show_from_all_shelves', to: 'show_shelvings#remove_show_from_all'
  end
end
