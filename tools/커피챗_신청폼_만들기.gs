/**
 * (주)이패스상사 경영지원팀 — 커피챗 신청 폼 만들기
 * 사용법: script.google.com → 새 프로젝트 → 전부 붙여 넣기 → 저장 → makeCoffeeChatForm 실행 → 로그의 주소 전달
 */
function makeCoffeeChatForm() {
  var f = FormApp.create('커피챗 신청 — (주)이패스상사 경영지원팀');
  f.setDescription(
    '4주차 「나만의 업무 포트폴리오」 주제를 정하기 전에, 정아름 팀장과 15분 커피챗을 할 수 있습니다.\n' +
    '· 신청은 3주차 동안 받습니다.\n' +
    '· 줌 또는 웨일온으로 만납니다. 일정과 접속 링크는 이메일로 보내 드립니다.\n' +
    '· 신청은 선택입니다. 고를 업종이나 반복 업무가 고민될 때 신청해 주세요.');
  f.setCollectEmail(true);
  f.addTextItem().setTitle('사원증 이름').setRequired(true);
  f.addMultipleChoiceItem().setTitle('만나는 방법').setChoiceValues(['줌', '웨일온', '둘 다 괜찮아요']).setRequired(true);
  f.addCheckboxItem().setTitle('가능한 시간대').setChoiceValues(['평일 낮', '평일 저녁', '주말']).setRequired(true);
  f.addTextItem().setTitle('가능한 날짜와 시간').setHelpText('예: 12/9(화) 20시 이후, 12/10(수) 점심');
  f.addParagraphTextItem().setTitle('이야기하고 싶은 것')
    .setHelpText('예: 고르고 싶은 업종, 반복 업무 후보, 막힌 점. 실제 회사 자료나 거래 금액은 적지 않습니다.');
  f.setConfirmationMessage('신청했습니다. 일정과 접속 링크는 이메일로 보내 드립니다.');
  var sh = SpreadsheetApp.create('응답_커피챗 신청');
  f.setDestination(FormApp.DestinationType.SPREADSHEET, sh.getId());
  Logger.log('[커피챗] 수강생용 주소: ' + f.getPublishedUrl() + '\n[커피챗] 응답 시트: ' + sh.getUrl());
}
