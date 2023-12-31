/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        // colors: {},
        extend: {
            fontFamily: {
                inter: 'Inter, sans-serif',
            },
            textColor: {
                // Цвета типографии (текст + иконки)
                primary: 'rgba(255, 255, 255)',
                secondary: 'rgba(255, 255, 255, 0.8)',
                tertiary: 'rgba(255, 255, 255, 0.65)',

                inherit: 'inherit',
            },
            backgroundColor: {
                // Фон большинства элементов (хедер, сайдбар, ...)
                primary: 'rgba(34, 39, 43, 1)',
                // Более тёмный фон для акцента
                secondary: 'rgba(22, 26, 29, 1)',
                // Выделенные элементы (в фигме встречается только в
                // выгрузке таблицы, этим цветом подсвечиваются строчки)
                highlight: 'rgba(47, 52, 56, 1)',

                // Цвета элементов управления
                control: {
                    // Большинство кнопок и выделенные элементы (синий цвет)
                    primary: 'rgba(0, 120, 210, 1)',
                    // Полупрозрачные кнопки
                    ghost: 'rgba(250, 250, 250, 0.16)',
                    // Кнопки с отменой действия/удалением (красный цвет)
                    delete: 'rgba(198, 1, 1, 1)',
                },
            },
        },
    },
    plugins: [],
}
