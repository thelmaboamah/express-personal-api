//Desired feature, notice telling you how many days until your goal is due.
$(document).ready(function(){
console.log("Sanity Check: JS is working!");

	//Get all goals when page loads
	$.ajax({
		method: "GET",
		url: "/api/goals",
		success: showGoalsSuccess
	});

	//Add new goal when form is submitted
	$(".new-goals-form").submit(function(e){
		e.preventDefault();

		$.ajax({
			method: "POST",
			url: "/api/goals",
			data: $(this).serialize(),
			success: createGoalSuccess
		})
	});

	//Change goal to done
	$(".isDoneYet").change(function(){
		$.ajax({
			method: "PUT",
			url: "/api/goals/:goal_id",
			success: changeDoneStatus
		});
	});

});


function showGoalsSuccess(json) {
	var goals = json;
	goals.forEach(function(goal){
		$(".goals")
		.prepend(`<div class="card col-sm-6">
				<div class="card-block" data-id="${goal._id}">
					<h4>What's the goal?</h4>
					<p>${goal.goal}</p>
					<h4>Why is it important?</h4>
					<p>${goal.whyImportant}</p>
					<h4>What's your deadline?</h4>
					<p>${goal.completeByDate}</p>
					<h4>What's your reward for getting it done?</h4>
					<p>${goal.reward}</p>
					<p>Have you done this yet? <input type="checkbox" class="isDoneYet" value="${goal.completed}"></p>
					<button type="button" class="edit-btn btn btn-outline-info btn-lg">Edit Goal</button>
					<button type="button" class="delete-btn btn btn-outline-danger btn-lg">Delete Goal</button>
				</div>
			</div>`)
	})

	//Code to delete a goals, won't work until goals are on the page
	$(".delete-btn").click(function(){
		var goalId = $(this).parent().attr("data-id");
		var goalBox = $(this).parentsUntil(".goals");
		$.ajax({
			method: "DELETE",
			url: `api/goals/${goalId}`,
			success: goalBox.remove()
		})
	})
	
	$(".edit-btn").click(function(){
		//turn box into form with pre-filled fields
		var goalId = $(this).parent().attr("data-id");
		//Input form and make the text equal to value
		var newForm = 
			`<form action="/api/goals/${goalId}>
				
			</form>
			`
	})
}

function changeDoneStatus(json) {
	var status = $(this).val();
	if($(this).attr('checked')) {
		status = "true";
	} else {
		status = "false";
	}
	// status = Boolean(status);
	// goal.completed = status;
}

function createGoalSuccess(json){
	var goal = json;
	$(".goals")
		.prepend(`<div class="card col-sm-6">
				<div class="card-block" data-id="${goal._id}">
				<h4>What's the goal?</h4>
				<p>${goal.goal}</p>
				<h4>Why is it important?</h4>
				<p>${goal.whyImportant}</p>
				<h4>What's your deadline?</h4>
				<p>${goal.completeByDate}</p>
				<h4>What's your reward for getting it done?</h4>
				<p>${goal.reward}</p>
				<p>Have you done this yet? <input type="checkbox" class="isDoneYet" value="${goal.completed}"></p>
				<button type="button" class="edit-btn btn btn-outline-info btn-lg">Edit Goal</button>
				</div>
				<button type="button" class="delete-btn btn btn-outline-danger btn-lg">Delete Goal</button>
				</div>
			</div>`)
}
