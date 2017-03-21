var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	inst    : String,
	instType: String,
	instNumb: Number,
	manufact: String,
	model	: String,
	serial	: String,
	status	: String,
	components: String,
	needsRepair: String,
	currUser: String,
	useDate : String,
	extra	: String,
	image	: String,
}, { collection: 'instruments' });

mongoose.model('Post', PostSchema);

/*
<th>악기</th>
<th>분류</th>
<th>번호</th>
<th>제조사</th>
<th>모델명</th>
<th>씨리얼 넘버</th>
<th>상태</th>
<th>구성품</th>
<th>수리 필요 여부</th>
<th>현사용자</th>
<th>사용 시작 날짜</th>
<th>비고</th>
<th>사진</th>
*/