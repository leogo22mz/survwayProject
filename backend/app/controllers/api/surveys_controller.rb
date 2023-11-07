class Api::SurveysController < ApplicationController

    def index
        @surveys = Survey.includes(questions: :choices).all
        render json: @surveys, include: { questions: { include: :choices } }
    end

    def show
        @survey = Survey.find(params[:id])
        render json: @survey
    end

    def create
        @survey = Survey.new(params.require(:survey).permit(:title, :description, :created_by))
        if @survey.save
            render json: @survey, status: :created
        else
            render json: @survey.errors, status: :unprocessable_entity
        end
    end

    def update
        survey = Survey.find(params[:id])

        if survey.update(params.require(:survey).permit(:title, :description, :created_by))
            render json: @survey, status: :created
        else
            render json: @survey.errors, status: :unprocessable_entity
        end
    end

    def destroy
        survey = Survey.find(params[:id])
        survey.destroy
    end

end