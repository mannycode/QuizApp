/**
 * Created by tricom on 4/25/14.
 */



window.onload=init;
var score= 0,radios;
var count=0;
var answers=new Array();
var question;
var choices,co= 0,cr;
var c,newScore,radioButton;
var correctAnswer;



function disp_next() {
var q,result,ch0,ch1,ch2,ch3,result0,result1,result2,result3;
    c = count + 1;
    $.getJSON("allQuest.json",function (json) {

       result= JSON.stringify(json.a[count].question);
     //  alert(q);
        q=result.substring(1, result.length-1);

       document.querySelector('#ques').innerHTML = "Question " + c + ". " + q;
       result0=JSON.stringify(json.a[count].choices[0]);
       ch0 = JSON.parse(result0);


        document.querySelector('#opt0').innerHTML = ch0;



        result1=JSON.stringify(json.a[count].choices[1]);
        ch1 = JSON.parse(result1);
        document.querySelector('#opt1').innerHTML = ch1;

        result2=JSON.stringify(json.a[count].choices[2]);
        ch2 = JSON.parse(result2);
        document.querySelector('#opt2').innerHTML = ch2;
        result3=JSON.stringify(json.a[count].choices[3]);
        ch3 = JSON.parse(result3);
        document.querySelector('#opt3').innerHTML = ch3;





    });




        var ele = document.getElementsByName("opt");
    //ele[0].checked=true;
    for(var i=0;i<ele.length;i++)
        ele[i].checked = false;


    if (answers[count]!=null) {

//        radios = document.getElementsByName('opt');
  //      radios[0].checked=true;

        ele[answers[count]].checked=true;



    }


}

function goBack()
{
    count=count-1;
   // alert("Count changed to"+count);
    disp_next();

}
function init()
{

//alert("hi");
    document.getElementById("bb").style.display = "none";
  //  document.getElementById("aa").style.display = "none";
}


function getAnswer() {
    document.getElementById("aa").style.display = "none";

    $('#bb').hide().fadeIn(1000);

    //alert("Count: "+count);

    var a= $("input:radio[name='opt']").is(":checked");
    //alert("Clicked "+ a);

    if (co>0&&a===false)

    {

        alert("Please select an answer");


    }

    else {

//    alert("Yo!");
        radios = document.getElementsByName('opt');

        if (co > 0) {


            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                 answers[count]=radios[i].value;

                    break;
                }
            }
            count++;
        }


      //  alert("Count:"+count);
        if (count === 4) {
           // alert(answers.length);
            newScore=0;
            $.getJSON("allQ.json",function (json) {

                var result,ch;



                for (var z = 0; z < answers.length; z++) {

                    // alert("Answers "+answers[z]);
                    // alert("in loop");

                    result=JSON.stringify(json.a[z].correctAnswer);
                    ch = JSON.parse(result);
                   // alert("Stored "+ch);


                    if (answers[z].toLocaleString() === ch.toLocaleString()) {
                       // alert("Correct");
                        newScore++;
                    }


                }

                alert("Thank you for taking the test. Your Score is "+ newScore);
                document.getElementById("bb").style.display = "none";
                $("#aa").show();


            });



        }

        disp_next();

    }


    co=1;
}


