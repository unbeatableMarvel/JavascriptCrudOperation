document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
var issueId = 0;

var editableId;

function saveIssue(e) {

    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var allIssues = JSON.parse(localStorage.getItem('issues'));
    
   

    if(editableId!=null && editableId!='')
    {
  
    for (var i = 0; i < allIssues.length; i++) {
        if (allIssues[i].id == editableId) {
            allIssues[i].id=editableId;
            allIssues[i].description=issueDesc;
            allIssues[i].severity= issueSeverity;
            allIssues[i].assignedTo =issueAssignedTo;
       
        }
      }
    
      localStorage.setItem('issues', JSON.stringify(allIssues));
      editableId='';
    }
    else
    {
        var issue = {
            id: issueId,
            description: issueDesc,
            severity: issueSeverity,
            assignedTo: issueAssignedTo
          }
       
          if (localStorage.getItem('issues') == null) {
            var issues = [];
            issues.push(issue);
            localStorage.setItem('issues', JSON.stringify(issues));
          } else {
            var issues = JSON.parse(localStorage.getItem('issues'));
            issues.push(issue);
            localStorage.setItem('issues', JSON.stringify(issues));
          }
          
          issueId++;
 
 
    }
   
 
  document.getElementById('issueInputForm').reset();

  fetchIssues();
  
  e.preventDefault();
}

function editRaisedIssue(id) {
  editableId=id;
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issueDesc = document.getElementById('issueDescInput');
  var issueSeverity = document.getElementById('issueSeverityInput');
  var issueAssignedTo = document.getElementById('issueAssignedToInput');
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
 
     issueDesc.value=issues[i].description;
     issueSeverity.value=issues[i].severity;
     issueAssignedTo.value=issues[i].assignedTo;
   
    }
  }
  
  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesListe = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well">'+
                              '<p><span class="label label-info">Issue ID: ' + id +'</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" onclick="editRaisedIssue(\''+id+'\')" class="btn btn-warning">Edit</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}