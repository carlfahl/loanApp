// 
// Carl A. Fahlstrom
//

var Loan = function () {
    this.amount = 0;
    this.loan = 0;
    this.ssn = 0;
}

Loan.prototype.getAmount = function () {
    return this.amount;
}

Loan.prototype.getLoan = function () {
    return this.loan;
}

Loan.prototype.getSSN = function () {
    return this.ssn;
}

function checkLoanApp (loanAmountText, propValueText, SSNText) {
    loanAmount = loanAmountText.value;
    propValue = propValueText.value;
    SSN = SSNText.value;
    console.log("About to send AJAX request.");

    $.ajax({
        url: '/approve_loan',
        type: 'POST',
        data: {'loanAmount': loanAmount, 'propVal':propValue, 'SSN':SSN}
    }).done(function (data) {
        var results = data.split(",");
        if (results[0] == "Approved") {
            $("#loanResult").html("The loan #" + results[1] + " is approved.");
            $("#loanResult").removeClass("badLoan");
            $("#loanResult").addClass("goodLoan");
	}
        else if (results[0] == "Rejected") {
            $("#loanResult").html("The loan #" + results[1] + " is rejected.");
            $("#loanResult").removeClass("goodLoan");
            $("#loanResult").addClass("badLoan");
	}
    });
}

function getLoanStatus(loanIDText) {
    loanID = loanIDText.value;

    $.ajax({
        url: '/check_status',
        type: 'POST',
        data: {'loanID': loanID}
    }).done(function (data) {
        var results = data.split(",");
        $("#loanStatus").html("The loan # " + results[1] + " was " + results[0].toLowerCase() + ".");
        if (results[0] == "Approved") {
            $("#loanStatus").removeClass("badLoan");
            $("#loanStatus").addClass("goodLoan");
	}
        else if (results[0] == "Rejected") {
            $("#loanStatus").removeClass("goodLoan");
            $("#loanStatus").addClass("badLoan");
	}
        
    });
}
