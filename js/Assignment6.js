function MenuChoice()
{
    if (document.getElementById("menu").value =="Add Customer Data")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Update Address")
    {
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value =="Delete Customer Data")
    {
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
    }
    else 
    {
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
    }
    
}

function CreateCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    //Collect Customer data from web page
    var customerid = document.getElementById("custid").value;
    var customername = document.getElementById("custname").value;
    
    //Create the parameter string
    var newcustomer = '{"CustomerID":"' + customerid + '","CompanyName":"' + customername +'"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcustomer);
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}



function UpdateAddress()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    //Collect Customer data from web page
    var orderid = document.getElementById("orderid").value;
    var shippingname = document.getElementById("shipname").value;
    var shippingaddress = document.getElementById("shipaddress").value;
    var shippingcity = document.getElementById("shipcity").value;
    var shippingpostalcode = document.getElementById("shipzip").value;
    
    //Create the parameter string
    var updatedaddress = '{"OrderID":"' + orderid + '","ShipName":"' + shippingname + '","ShipAddress":"' + shippingaddress + '","ShipCity":"' + shippingcity + '","ShipPostcode":"' + shippingpostalcode +'"}';
    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result1 = JSON.parse(objRequest.responseText);
            OperationResult1(result1);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(updatedaddress);
}

function OperationResult1(output1)
{
    if (output1.WasSuccessful == 1)
    {
        document.getElementById("result1").innerHTML = "The operation was successful!";
    }
    else if (output1.WasSuccessful == 0)
    {
        document.getElementById("result1").innerHTML = "The operation was not successful!" + "<br>" + "Operation failed with an unspecified error";
    }
    else if (output1.WasSuccessful == -2)
    {
        document.getElementById("result1").innerHTML = "The operation was not successful!" + "<br>" + "Operation failed because the data string supplied could not be deserialized into the service object";
    }
    else
    {
        document.getElementById("result1").innerHTML = "The operation was not successful!" + "<br>" + "Operation failed because a record with the supplied Order ID could not be found";
    }
}



function DeleteCustomer()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    url += document.getElementById("custid2").value;

    
    //Checking for AJAx operation return
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result2 = JSON.parse(objRequest.responseText);
            OperationResult2(result2);
        }
    }
    
    //Start AJAX request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OperationResult2(output2)
{
    if (output2.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("result2").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output2.Exception;
    }
}