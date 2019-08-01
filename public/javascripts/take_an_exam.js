$(function () {
    window.cheatCount = 0;
    openCam();
    // setInterval(checkCheat, Math.round(Math.random() * 60 * 1000));
    setInterval(checkCheat, Math.round(Math.random() * 20 * 1000));

    // submit answers
    $('#submit').click(submitAnswers)
});

/* Compare candidate's face with the profile avatar after a random period.
 * If not match, it would be a cheat activity.
 * If cheat time count over 3, the exam will be forced terminated and the candidate will be labelled as a cheater. */
function checkCheat() {
    console.log('test timeOut');
    buildData(function (url, data) {
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success(data) {
                console.log(data);
                if (data.confidence < 70) {
                    cheatCount += 1;
                    console.log(cheatCount);
                    if (cheatCount < 3) {
                        alert('Warning: Your face does not match with your profile avatar, which is considered as a cheating activity.\n\n' +
                            'You have cheated ' + cheatCount + ' time(s)');
                    }
                    else if (cheatCount === 3) {
                        alert('Warning: This is the last warning! This exam will be forced terminated if you cheat one more time, and you will 0 mark for this exam!')
                    }
                    else {
                        alert('You cheated too many time! This exam is force terminated, and you will get 0 mark for this exam!');
                        let examId = $('#exam-id').text(),
                            sid = $('#sid').text();
                        // console.log(examId, sid);
                        $.post('/students/' + sid + '/exams/' + examId + '/finish', {
                            sid: sid,
                            exam_id: examId,
                            is_cheater: 'true',
                            answers: JSON.stringify([]),
                            is_marked: 'false'
                        }, function (data) {
                            window.location.href = '/students/' + sid + '/exams';
                        });
                    }
                }
            }
        })
    });
}

/* Submit answers */
function submitAnswers() {
    let examId = $('#exam-id').text(),
        sid = $('#sid').text(),
        answers = [],
        ansNo = 1;

    // build answers data
    $('#questions').find('textarea').each(function () {
        // answers[ansNo] = $(this).val();
        answers.push($(this).val());
        ansNo += 1
    });
    console.log(answers);

    $.post('/students/' + sid + '/exams/' + examId + '/finish', {
        sid: sid,
        exam_id: examId,
        is_cheater: 'false',
        answers: JSON.stringify(answers),
        is_marked: 'false'
    }, function (data) {
        window.location.href = '/students/' + sid + '/exams';
    });
}