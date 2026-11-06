'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bmi-form');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const errorMessage = document.getElementById('error-message');
  const result = document.getElementById('result');
  const bmiValue = document.getElementById('bmi-value');
  const bmiCategory = document.getElementById('bmi-category');
  const resultDescription = document.getElementById('result-description');

  // Поддерживает ввод как через точку, так и через запятую.
  function readNumber(value) {
    const normalized = value.trim().replace(',', '.');
    if (normalized === '') return NaN;
    return Number(normalized);
  }

  function getCategory(bmi) {
    if (bmi <= 16) {
      return {
        title: 'Выраженный дефицит массы',
        description: 'Показатель соответствует выраженному дефициту массы тела.'
      };
    }
    if (bmi < 18.5) {
      return {
        title: 'Недостаточная масса тела',
        description: 'Показатель ниже диапазона нормальной массы тела.'
      };
    }
    if (bmi < 25) {
      return {
        title: 'Норма',
        description: 'Показатель находится в диапазоне нормальной массы тела.'
      };
    }
    if (bmi < 30) {
      return {
        title: 'Избыточная масса тела',
        description: 'Показатель соответствует избыточной массе тела (предожирению).'
      };
    }
    if (bmi < 35) {
      return {
        title: 'Ожирение первой степени',
        description: 'Показатель соответствует ожирению первой степени.'
      };
    }
    if (bmi < 40) {
      return {
        title: 'Ожирение второй степени',
        description: 'Показатель соответствует ожирению второй степени.'
      };
    }
    return {
      title: 'Ожирение третьей степени',
      description: 'Показатель соответствует ожирению третьей степени (морбидному).'
    };
  }

  function hideResult() {
    result.classList.add('hidden');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    const heightCm = readNumber(heightInput.value);
    const weightKg = readNumber(weightInput.value);

    if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) {
      errorMessage.textContent = 'Введите рост и массу тела. Используйте цифры.';
      hideResult();
      return;
    }

    if (heightCm < 50 || heightCm > 250) {
      errorMessage.textContent = 'Рост должен быть в диапазоне от 50 до 250 см.';
      hideResult();
      heightInput.focus();
      return;
    }

    if (weightKg < 10 || weightKg > 500) {
      errorMessage.textContent = 'Масса тела должна быть в диапазоне от 10 до 500 кг.';
      hideResult();
      weightInput.focus();
      return;
    }

    // Переводим сантиметры в метры и применяем формулу ИМТ = масса / рост².
    const heightMeters = heightCm / 100;
    const bmi = weightKg / (heightMeters * heightMeters);
    const interpretation = getCategory(bmi);

    bmiValue.textContent = bmi.toFixed(1).replace('.', ',');
    bmiCategory.textContent = interpretation.title;
    resultDescription.textContent = interpretation.description;
    result.classList.remove('hidden');
  });

  form.addEventListener('reset', () => {
    errorMessage.textContent = '';
    hideResult();
  });

  // При изменении исходных данных старый результат скрывается.
  heightInput.addEventListener('input', hideResult);
  weightInput.addEventListener('input', hideResult);
});
