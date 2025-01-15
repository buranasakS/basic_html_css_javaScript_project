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
        $('#prev').toggle(count > 0);
        if (count === 9) {
            $('#next').hide();
            $('#submit').show();
        } else {
            $('#next').show();
            $('#submit').hide();
        }
    }

    function adding_Questions(data, i) {
        $('#question').text(data[i].Quiz);
        $('#options1').text(data[i].option1);
        $('#options2').text(data[i].option2);
        $('#options3').text(data[i].option3);
        $('#options4').text(data[i].option4);
        $('#number').text(Number(i + 1));
    }

    function selected_Answer() {
        $(".option").each(function (index) {
            if ($(this).text() === answer[count]) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
    }

    function creating_result(data) {
        correct = 0;
        for (var i = 0; i < answer.length; i++) {
            if (answer[i] === data.Questions[i].answer) {
                correct++;
            }
        }
        $('#main').hide();
        $('#correct_answer').text(correct);
        $('#percentage').text((correct / data.Questions.length) * 100 + "%");
        $("#Result").show();
    }

    $("#options").hide();

    fetch('quiz/data.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const totalQuestions = data.Questions.length;

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
                        $("#Result").show();
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
                if (answer[count] === undefined) {
                    alert("กรุณาเลือกคำตอบ!!");
                } else {
                    count++;
                    adding_Questions(data.Questions, count);
                    $(".option").removeClass("active");
                    btnOut();
                    selected_Answer();
                    $("html, body").animate({ scrollTop: $("#main").offset().top }, 300);
                }
            });

            $('#prev').click(function () {
                count--;
                adding_Questions(data.Questions, count);
                btnOut();
                selected_Answer();
                $("html, body").animate({ scrollTop: $("#main").offset().top }, 300);
            });

            $("#submit").click(function () {
                if (answer[count] === undefined) {
                    alert("กรุณาเลือกคำตอบ!!");
                } else {
                    creating_result(data);
                    clearInterval(timer);
                }
            });
        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
            alert("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง!");
        });
});