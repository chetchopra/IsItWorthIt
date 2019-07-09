class ComparisonItemsController < ApplicationController
     # Runs get_comparison_item before the show and update method
    before_action :get_comparison_item, only: [:show, :update]

    def index
        comparisonItems = ComparisonItem.all
        render json: comparisonItems
    end

    def show
        render json: @comparison_item
    end

    def create
        comparison_item = ComparisonItem.create(get_comparison_item_params)
        # Renders json for the newly created comparison_item
        render json: comparison_item
    end

    def update
        @comparison_item.update(get_comparison_item_params)
        # Renders json for the updated comparison_item
        render json: @comparison_item
    end

    private 
    # Strong params for comparison_item
    def get_comparison_item_params
        return params.require(:comparison_item).permit(:name, :cost, :description, :img_url)
    end

    # Finds and returns a specific comparison_item
    def get_comparison_item
        @comparison_item = ComparisonItem.find_by_id(params[:id])
        if @comparison_item
            return @comparison_item
        else 
            render json: {"message": {"type": "error", "content": "The comparison item could not be found!"}}
        end
    end
end