let addStuSector = document.querySelector('#addStudent');
let searchStuSector = document.querySelector('#searthStudent');
// let editStuSector = document.querySelector('#editStudent');
let deleteStuSector = document.querySelector('#deleteStudent');
addStuSector.addEventListener('click', showAddStudentSector, false);
searchStuSector.addEventListener('click', showSearchStudentSector, false);
// editStuSector.addEventListener('click', showEditStudentSector, false);
deleteStuSector.addEventListener('click', showDeleteStudentSector, false);
document.querySelector('#about').addEventListener('click', showAboutMessage, false);

function showAboutMessage() {
	swal({
		title: "About",
		text: "© Powered By Jin.",
		timer: 1000,
		showConfirmButton: false
	});
}

function showAddStudentSector(e) {
	e.preventDefault();
	showSector('add');
	const addStuButton = document.querySelector('#addStuButton');
	addStuButton.addEventListener('click', addStuToStorage, false);
}

function addStuToStorage(e) {
	e.preventDefault();
	const name = document.querySelector('#stu-name').value;
	const no = document.querySelector('#stu-no').value;
	const klass = document.querySelector('#stu-class').value;
	const math = document.querySelector('#stu-math').value;
	const english = document.querySelector('#stu-english').value;
	const chinese = document.querySelector('#stu-chinese').value;
	const coding = document.querySelector('#stu-coding').value;
	if (!isKlassRight(klass)) {
		document.querySelector('#stu-class').classList.add('alert-danger');
		document.querySelector('#stu-class').value = '';
		return;
	}
	document.querySelector('#stu-class').classList.remove('alert-danger');
	addStudent({
		name: name,
		no: no,
		class: klass,
		math: parseInt(math, 10),
		english: parseInt(english, 10),
		chinese: parseInt(chinese, 10),
		coding: parseInt(coding, 10)
	});
	showStuList();
	showSector('none');
}

function isKlassRight(klass) {
	const klazz = ['一班', '二班', '三班', '四班', '五班'];
	if (!klazz.includes(klass)) {
		sweetAlert("班级输入错误！", "请重新输入！", "error");
		return false;
	}
	return true;
}

function showSearchStudentSector(e) {
	e.preventDefault();
	showSector('search');
	document.querySelector('#searchStuNo').addEventListener('keyup', searchStuFromStorage, false);
}

function searchStuFromStorage(e) {
	e.preventDefault();
	const stuNo = this.value;
	const stuInfo = stuNo ? searchStudent(stuNo) : null;
	if (stuInfo) {
		document.querySelector('#searchResult').style.display = 'block';
		document.querySelector('#searchResult table tbody').innerHTML = '';
		document.querySelector('#searchResult table tbody').appendChild(createStuTr(1, stuInfo));
		const editButton = document.querySelector('#searchResult .editStudent');
		editButton.addEventListener('click', showEditStudentSector.bind(null, stuInfo), false);
	}
}

function showEditStudentSector(stuInfo) {
	showSector('edit');
	document.querySelector('#edit-name').value = stuInfo.name;
	document.querySelector('#edit-no').value = stuInfo.no;
	document.querySelector('#edit-class').value = stuInfo.class;
	document.querySelector('#edit-math').value = stuInfo.math;
	document.querySelector('#edit-english').value = stuInfo.english;
	document.querySelector('#edit-chinese').value = stuInfo.chinese;
	document.querySelector('#edit-coding').value = stuInfo.coding;
	document.querySelector('.edit-student .confirmEdit').addEventListener('click', editStuToStorage, false);
	document.querySelector('.edit-student .cancelEdit').addEventListener('click', showSector.bind(null, 'none'), false);
}

function editStuToStorage() {
	const name = document.querySelector('#edit-name').value;
	const no = document.querySelector('#edit-no').value;
	const klass = document.querySelector('#edit-class').value;
	const math = document.querySelector('#edit-math').value;
	const english = document.querySelector('#edit-english').value;
	const chinese = document.querySelector('#edit-chinese').value;
	const coding = document.querySelector('#edit-coding').value;
	if (!isKlassRight(klass)) {
		document.querySelector('#edit-class').classList.add('alert-danger');
		document.querySelector('#edit-class').value = '';
		return;
	}
	document.querySelector('#edit-class').classList.remove('alert-danger');
	editStudent({
		name: name,
		no: no,
		class: klass,
		math: parseInt(math, 10),
		english: parseInt(english, 10),
		chinese: parseInt(chinese, 10),
		coding: parseInt(coding, 10)
	});
	showStuList();
	showSector('none');
}

function showDeleteStudentSector(e) {
	e.preventDefault();
	swal({
			title: "删除用户信息",
			text: "请输入要删除学生的学号",
			type: "input",
			showCancelButton: true,
			closeOnConfirm: false,
			animation: "slide-from-top",
			inputPlaceholder: "学号"
		},
		function (inputValue) {
			if (inputValue === false) return false;

			if (inputValue === "") {
				swal.showInputError("请正确输入学号!");
				return false;
			}
			if (isNumber(inputValue)) {
				deleteStudent(inputValue, showStuList);
			}
		});
}

function showSector(sector) {
	const allSectors = ['add-student', 'search-student', 'edit-student'];
	allSectors.forEach(block => {
		if (block.includes(sector)) {
			document.querySelector(`.${block}`).style.display = 'block';
		} else {
			document.querySelector(`.${block}`).style.display = 'none';
		}
	});
}

function showStuList() {
	const storageLength = localStorage.length;
	document.querySelector('.show-studentlist table tbody').innerHTML = '';
	for (let i = 0; i < storageLength; i++) {
		let storageKey = localStorage.key(i);
		if (storageKey.includes('stuNo-')) {
			const stuInfo = JSON.parse(localStorage.getItem(storageKey));
			document.querySelector('.show-studentlist table tbody').appendChild(createStuTr(i + 1, stuInfo));
		}
	}
}


function createStuTr(no, stuInfo) {
	const tr = document.createElement('tr');
	const lineNo = document.createElement('th');
	lineNo.setAttribute('scope', 'row');
	lineNo.textContent = no;
	tr.appendChild(lineNo);
	tr.appendChild(createTd(stuInfo.name));
	tr.appendChild(createTd(`${stuInfo.no}`));
	tr.appendChild(createTd(stuInfo.chinese));
	tr.appendChild(createTd(stuInfo.math));
	tr.appendChild(createTd(stuInfo.english));
	tr.appendChild(createTd(stuInfo.coding));
	tr.appendChild(createTd(stuInfo.totalScore));
	tr.appendChild(createTd(stuInfo.avageScore));
	return tr;
}

function createTd(content) {
	const td = document.createElement('td');
	td.textContent = content;
	return td;
}

window.onload = showStuList;