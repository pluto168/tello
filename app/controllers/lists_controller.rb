class ListsController < ApplicationController
  before_action :set_list, only: [ :show, :edit, :update, :destroy, :move ]
  before_action :authenticate_user!

  # GET /lists or /lists.json
  def index
    # @lists = List.all   看到所有人
    @lists = current_user.lists
  end

  def move
    @list.insert_at(list_params[:position].to_i)
    render 'show.json'
  end

  # GET /lists/1 or /lists/1.json
  # def show
  # end

  # GET /lists/new
  # def new
  #   # @list = List.new
  #   @list = current_user.lists.new
  # end

  # GET /lists/1/edit
  # def edit
  # end

  # POST /lists or /lists.json
  def create
    # @list = List.new(list_params)
    @list = current_user.lists.new(list_params)


    respond_to do |format|
      if @list.save
        ActionCable.server.broadcast "board",{commit: 'ADD_LIST', payload: render_to_string(:show, format: :json)}
        format.html { redirect_to list_url(@list), notice: "List was successfully created." }
        format.json { render :show, status: :created, location: @list }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lists/1 or /lists/1.json
  def update
    respond_to do |format|
      if @list.update(list_params)
        format.html { redirect_to list_url(@list), notice: "List was successfully updated." }
        format.json { render :show, status: :ok, location: @list }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lists/1 or /lists/1.json
  def destroy
    @list.destroy

    ActionCable.server.broadcast "board",{commit: 'REMOVE_LIST', payload: render_to_string(:show, format: :json)}
    respond_to do |format|
      format.html { redirect_to lists_url, notice: "List was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      # @list = List.find(params[:id])
      @list = current_user.lists.find(params[:id])

    end

    # Only allow a list of trusted parameters through.
    def list_params
      params.require(:list).permit(:name, :position)
    end
end
