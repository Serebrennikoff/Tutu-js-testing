/*1. Взять не более двух блинов;
2. Обжарить взятые блины с одной стороны;
3. Есть еще блины? Да - Пункт 4 :  Нет - Пункт 6;
4. Отложить один наполовину обжаренный, взять один неготовый;
5. Закончить обжарку второго наполовину готового, обжарить с одной стороны неготовый;
6. Обжарить наполовину готовые блины с другой стороны;
7. Есть еще блины? Да - Пункт 1  :  Нет - Конец.*/


/*  --CODE--  */
let pancackesToCook = 10,
    halfCookedPancackes = 0,
    cookedPancackes = 0,
    time = 0;
function takePancackes(num) {
  pancackesToCook -= num;
  return num;
}
function cookOneSide(notCookedPancackes) {
  halfCookedPancackes += notCookedPancackes;
  cookedPancackes += halfCookedPancackes - notCookedPancackes;
  halfCookedPancackes -= halfCookedPancackes - notCookedPancackes;
  time++;
}

function cookPancackes() {
  let notCookedPancackes = (pancackesToCook) ?
                            (pancackesToCook >= 2) ?
                              takePancackes(2-halfCookedPancackes) : takePancackes(1)
                            : 0;
  cookOneSide(notCookedPancackes);
  notCookedPancackes = 0;
  return (!pancackesToCook && !halfCookedPancackes) ? time : cookPancackes();
}

console.log(cookPancackes());

