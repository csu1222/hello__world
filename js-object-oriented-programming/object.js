var brotherArray = ['jung', 'seong', 'chang'];

console.log("Array : ", brotherArray[1]);

var brotherObject = {
    First:'jung',
    second:'seong',
    third:'chang'
};

console.log('Object : ', brotherObject.second)

brotherObject.Father = 'myeong';
brotherObject.Mother = 'moon';

console.log('Father : ', brotherObject.Father, "Mother : ", brotherObject["Mother"]);

delete brotherObject.second

console.log('delete Object', brotherObject.second);