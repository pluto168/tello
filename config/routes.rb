Rails.application.routes.draw do
  devise_for :users

  resources :lists do
    member do
      put :move         # /lists/member(2)/move
    end
  end

  resources :cards do
    member do
      put :move         # /cards/member(2)/move
    end
  end
  
  # root 'pages#home'
  root 'lists#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
