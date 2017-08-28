function addStudent(stuInfo) {
	if (!isNumber(stuInfo.no) || !isNumber(stuInfo.math) || !isNumber(stuInfo.chinese) || !isNumber(stuInfo.english) || !isNumber(stuInfo.coding)) {
		sweetAlert("添加失败！", "请按正确格式输入学生信息!", "error");
		return;
	}
	calcAvageScore(stuInfo);
	const studentInfo = JSON.parse(localStorage.getItem(`stuNo-${stuInfo.no}`));
	if (studentInfo) {
		swal({
				title: "该生信息已存在！",
				text: "是否更新该生信息!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确定更新!",
				cancelButtonText: '取消',
				closeOnConfirm: false
			},
			function () {
				editStudent(stuInfo);
			});
		return;
	}
	localStorage.setItem(`stuNo-${stuInfo.no}`, JSON.stringify(stuInfo));
	swal("添加成功!", `已成功添加${stuInfo.name}的信息！`, "success");
}

function deleteStudent(stuNo, callback) {
	const studentInfo = JSON.parse(localStorage.getItem(`stuNo-${stuNo}`));
	if (!studentInfo) {
		swal("查无此人信息!", "请重试!", "warning");
		return;
	}
	swal({
			title: "确定删除该生信息么?",
			text: "删除后将无法找回!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "删除",
			cancelButtonText: '取消',
			closeOnConfirm: false
		},
		function () {
			localStorage.removeItem(`stuNo-${studentInfo.no}`);
			callback();
			swal(`已删除!`, `${studentInfo.name}的信息已经被删除！`, "success");
		});
}

function editStudent(stuInfo) {
	const studentInfo = JSON.parse(localStorage.getItem(`stuNo-${stuInfo.no}`));
	if (!studentInfo) {
		swal("查无此人信息!", "请重试!", "warning");
		return;
	}
	calcAvageScore(stuInfo);
	localStorage.setItem(`stuNo-${stuInfo.no}`, JSON.stringify(stuInfo));
	swal("成功!", `${stuInfo.name}的信息已更新！`, "success")
}

function searchStudent(stuNo) {
	const studentInfo = JSON.parse(localStorage.getItem(`stuNo-${stuNo}`));
	if (!studentInfo) {
		return;
	}
	return studentInfo;
}

function isNumber(ele) {
	return /^[0-9]*$/g.test(ele);
}

function calcAvageScore(stuInfo) {
	const totalScore = stuInfo.math + stuInfo.chinese + stuInfo.english + stuInfo.coding;
	stuInfo.totalScore = totalScore;
	stuInfo.avageScore = (totalScore / 4).toFixed(2);
}