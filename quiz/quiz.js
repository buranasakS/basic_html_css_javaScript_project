
var count = 0;
var time = 59;
var correct = 0;
var answer = [];
var timer;

$(document).ready(function () {
        $('#submit').hide();
        $('#Result').hide();

        btnOut();
        
        function btnOut() {
            if (count > 0) {
                $('#prev').show();
                if (count == 9) {
                    $('#next').hide();
                    $('#submit').show();
                } else {
                    $('#next').show();
                }
            } else {
                $('#prev').hide();
            }
        }

        function adding_Questions(data, i) {
            $('#question').text(data[i].Quiz)
            $('#options1').text(data[i].option1)
            $('#options2').text(data[i].option2)
            $('#options3').text(data[i].option3)
            $('#options4').text(data[i].option4)
            $('#number').text(Number(i + 1));

        }

        function selected_Answer() {
            for (var i = 0; i < 9; i++) {
                var a = document.getElementById("options").children;
                if (a[i].innerHTML == answer[count]) {
                    $("#options").children("button")[i].classList.add("active");
                } else {
                    $("#options").children("button")[i].classList.remove("active");
                }
            }
        }

        function creating_result(data) {
            for (var i = 0; i < answer.length; i++) {
                if (answer[i] == data.Questions[i].answer) {

                    correct += 1;
                }
            }
            $('#main').hide();

            
            $('#correct_answer').text(correct);
            $('#percentage').text((correct/10) * 100 + "%");

            $("#Result").show();
        }
        $("#options").hide();

        fetch('quiz/data.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                $('#btn').click(function () {
                    $('#options').show();
                    adding_Questions(data.Questions, count);
                    $('.start_page').hide();
                    $('#prev').hide();

                    timer = setInterval(timer_function, 1000);

                    function timer_function() {
                        $('#time').text(time);
                        if (time < 1) {
                            clearInterval(timer);
                            alert("หมดเวลา!!");
                            creating_result(data);
                            $("#main").hide();
                            $("#result").show();
                        }
                        time--;
                    }

                });

                $(".option").click(function () {

                    $(this).addClass("active");
                    $(this).siblings().removeClass("active");
                    answer[count] = $(this).html();
                });

                $('#next').click(function () {
                    if (count > answer.length - 1) {
                        alert("กรุณาเลือกคำตอบ!!")
                    } else {
                        count++;
                        adding_Questions(data.Questions, count);
                        $("#prev").show();
                        $(".option").removeClass("active");
                        btnOut();
                        selected_Answer();
                    }
                });

                $('#prev').click(function () {
                    count--;
                    adding_Questions(data.Questions, count);
                    btnOut();
                    selected_Answer();
                });

                $("#submit").click(function () {
                    if (count > answer.length - 1) {
                        alert("กรุณาเลือกคำตอบ!!");
                    } else {
                        creating_result(data);
                        clearInterval(timer);
                    }
                });



            })




    })
