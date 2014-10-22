/**
 *
 * the script displays questions and choices, checks the answers, calculates and displays the score
 * */



window.onload=init;
var score= 0,radios,count= 0,question,choices,co= 0,cr,c,newScore,radioButton,correctAnswer;
var answers=new Array();

//Display the next question and choices when the 'next' button is clicked

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
     for(var i=0;i<ele.length;i++)
        ele[i].checked = false;


    if (answers[count]!=null) {

        ele[answers[count]].checked=true;

    }


}

//when the user clicks the  'back' button to change an answer

function goBack()
{
    count=count-1;
    disp_next();

}


function init()
{
    document.getElementById("bb").style.display = "none";
}


//compares the user answer with the one stored in the JSON object and increments the score counter : count

function getAnswer() {
    document.getElementById("aa").style.display = "none";

    $('#bb').hide().fadeIn(1000);


    var a= $("input:radio[name='opt']").is(":checked");

    if (co>0&&a===false)

    {

        alert("Please select an answer");


    }

    else {

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


        if (count === 4) {
            newScore=0;
            $.getJSON("allQ.json",function (json) {

                var result,ch;



                for (var z = 0; z < answers.length; z++) {



                    result=JSON.stringify(json.a[z].correctAnswer);
                    ch = JSON.parse(result);


                    if (answers[z].toLocaleString() === ch.toLocaleString()) {
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


