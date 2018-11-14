
  // window.openDatabase("database-name","version","database description","database size in bytes")
  var db = window.openDatabase("tutorialdb", "1.0", "tutorial database", 1000000); //will create database Dummy_DB or open it
  document.addEventListener("deviceready", onDeviceReady, false);
 
  function onDeviceReady() {

   // Create Table
   db.transaction(populateDB, errorCB, successCB);

   // Select records
   fetchData();
  }

  function populateDB(tx){
   //tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT,note TEXT NOT NULL)');
   tx.executeSql('CREATE TABLE IF NOT EXISTS orders (cust_id INTEGER, order_detail TEXT, order_date TEXT)');
  }

  // Fetch all records
  function fetchData(){
   db.transaction(function(tx){
 
    tx.executeSql("select * from orders",[],function(tx1,result){
     var len = result.rows.length;
 
     for (var i=0; i<len; i++){
      var cust_id = result.rows.item(i).cust_id;
       var order_detail = result.rows.item(i).order_detail;
       var order_date =result.rows.item(i).order_date;


      // Add list item
      var ul = document.getElementById("list");
      var li = document.createElement("li");
       li.appendChild(document.createTextNode(cust_id + '::'+ order_detail + '::' + order_date));
      ul.appendChild(li);
     }
 
    },errorCB);
   }, errorCB, successCB);
  }
 
  function insertData(){

   // Insert record
   db.transaction(insertNote, errorCB, successCB);
   return false;
  }

  function insertNote(tx){
   var cust_id = document.getElementById('custid').value;
   var order_detail = document.getElementById('odtl').value;
   var order_date = document.getElementById('oDate').value;
 
   // Insert query
   tx.executeSql("INSERT INTO orders(cust_id,order_detail,order_date) VALUES (?,?,?)",[cust_id,order_detail,order_date]);
   
 
   // Append new list item
   var ul = document.getElementById("list");
   var li = document.createElement("li");
   li.appendChild(document.createTextNode(cust_id + ':' + order_detail + ':' + order_date ));
   ul.appendChild(li);
  }

  function errorCB(err) {
   alert("Error processing SQL: "+err.code);
  }

  function successCB() {
   // alert("success!");
  }
 