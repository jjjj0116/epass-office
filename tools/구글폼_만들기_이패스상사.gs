/**
 * (주)이패스상사 경영지원팀 — 구글폼 3개 만들기
 * 1) 업무 확인 요청(질문 폼)  2) 결재 상신(과제 폼)  3) 출근부(입장 기록용, 선택)
 *
 * 사용법: script.google.com → 새 프로젝트 → 이 내용을 전부 붙여 넣기 → 저장
 *        → 위쪽 함수 선택에서 makeForms → 실행 → 권한 허용
 *        → 실행 로그에 나온 주소들을 복사해 전달
 */
function makeForms() {
  var log = [];

  // ---------- 1. 업무 확인 요청 ----------
  var q = FormApp.create('업무 확인 요청 — (주)이패스상사 경영지원팀');
  q.setDescription(
    '업무 중 막히는 사항을 적어 주세요.\n' +
    '· 회신: 평일 24:00 전 일괄. 당일 18:00까지 접수분이 대상이고, 이후 접수분은 다음 평일에 회신합니다.\n' +
    '· 공통 사항은 오픈채팅, 개별 사항은 이메일로 회신합니다.\n' +
    '· 거래 금액과 실제 회사 자료는 적지 않습니다.\n' +
    '· 급한 문제는 오픈채팅에 바로 올려 주세요.');
  q.setCollectEmail(true);
  q.addTextItem().setTitle('사원증 이름').setRequired(true);
  q.addListItem().setTitle('주차').setChoiceValues(['1주차', '2주차', '3주차', '4주차']).setRequired(true);
  q.addDateItem().setTitle('날짜').setRequired(true);
  q.addTextItem().setTitle('어느 단계에서 막혔나요').setHelpText('예: 노션 1주차 5단계');
  q.addParagraphTextItem().setTitle('막힌 내용').setHelpText('무엇을 하다가, 어떤 화면(문구)이 나왔는지 적어 주세요.').setRequired(true);
  q.setConfirmationMessage('접수했습니다. 평일 24:00 전에 회신합니다.');
  var qSheet = SpreadsheetApp.create('응답_업무 확인 요청');
  q.setDestination(FormApp.DestinationType.SPREADSHEET, qSheet.getId());
  log.push('[질문 폼] 수강생용 주소: ' + q.getPublishedUrl());
  log.push('[질문 폼] 편집 주소: ' + q.getEditUrl());

  // ---------- 2. 결재 상신 ----------
  var s = FormApp.create('결재 상신 — (주)이패스상사 경영지원팀');
  s.setDescription(
    '한 주 업무를 마치면 결재를 올립니다.\n' +
    '1) 사무실 결재함의 「금일 결재 전 점검표」를 채우고 「점검표 복사하기」를 누릅니다.\n' +
    '2) 아래 「점검표 숫자」 칸에 붙여 넣습니다.\n' +
    '3) 마감 폴더 압축 파일(01_원자료 제외)을 올립니다.\n' +
    '마감 일시는 오픈채팅 공지를 확인해 주세요.');
  s.addTextItem().setTitle('사원증 이름').setRequired(true);
  s.addListItem().setTitle('주차').setChoiceValues(['1주차', '2주차', '3주차', '4주차']).setRequired(true);
  s.addParagraphTextItem().setTitle('점검표 숫자')
    .setHelpText('사무실 결재함 점검표에서 「점검표 복사하기」를 누른 뒤 여기에 붙여 넣어 주세요.')
    .setRequired(true);
  s.setConfirmationMessage('결재가 상신되었습니다. 결재 의견(승인 · 보완 요청 · 반려)은 금요일에 전달합니다.');
  var sSheet = SpreadsheetApp.create('응답_결재 상신');
  s.setDestination(FormApp.DestinationType.SPREADSHEET, sSheet.getId());
  log.push('[과제 폼] 수강생용 주소: ' + s.getPublishedUrl());
  log.push('[과제 폼] 편집 주소: ' + s.getEditUrl() + '  ← 여기서 「파일 업로드」 질문 1개를 직접 추가');

  // ---------- 3. 출근부(선택) ----------
  var a = FormApp.create('출근부 — (주)이패스상사 경영지원팀');
  a.setDescription('사무실 입장 기록입니다. 사무실 페이지가 자동으로 보냅니다.');
  var aName = a.addTextItem().setTitle('사원증 이름');
  var aChar = a.addTextItem().setTitle('캐릭터');
  var aSheet = SpreadsheetApp.create('응답_출근부');
  a.setDestination(FormApp.DestinationType.SPREADSHEET, aSheet.getId());
  var pre = a.createResponse()
    .withItemResponse(aName.createResponse('NAME'))
    .withItemResponse(aChar.createResponse('CHAR'))
    .toPrefilledUrl();
  log.push('[출근부] 연결용 주소(그대로 전달): ' + pre);
  log.push('[출근부] 응답 시트: ' + aSheet.getUrl());

  Logger.log(log.join('\n'));
}
