class Api::SurveysController < ApplicationController
    before_action :set_survey, only: [ :show, :update, :destroy]

    def index
        @surveys = Survey.includes(questions: :choices).all
        render json: @surveys, include: { questions: { include: :choices } }
    end

    def show
        render json: @survey
    end

    def create
        @survey = Survey.new(survey_params)
        if @survey.save
            render json: @survey, status: :created
        else
            render json: @survey.errors, status: :unprocessable_entity
        end
    end

    def update
        if @survey.update(survey_params)
            render json: @survey, status: :created
        else
            render json: @survey.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @survey.destroy
    end

private

    def set_survey
        @survey = Survey.find(params[:id])
    end

    def set_survey
        @survey = Survey.find(params[:id])
    end

    def survey_params
        params.require(:survey).permit(:title, :description, :created_by, questions_attributes: [:content, :question_type, choices_attributes: [:content]])
      end
      
    
end