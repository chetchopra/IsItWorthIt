class ComparisonItemsController < ApplicationController
    def index
        comparisonItems = ComparisonItem.all
        render json: comparisonItems
    end
end