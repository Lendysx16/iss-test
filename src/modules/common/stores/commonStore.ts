import { defineStore } from 'pinia';
import { ref } from 'vue';
import { parse, stringify } from 'zipson';

enum ThemeType {
  Dark = 'dark',
  Light = 'light',
}

export const useCommonStore = defineStore(
  'common-store',
  () => {
    const theme = ref<ThemeType>(ThemeType.Light);

    const toggleTheme = () => {
      switch (theme.value) {
        case ThemeType.Dark: {
          theme.value = ThemeType.Light;
          document.documentElement.classList.toggle('dark', false);
          break;
        }

        case ThemeType.Light: {
          theme.value = ThemeType.Dark;
          document.documentElement.classList.toggle('dark', true);
          break;
        }
      }
    };

    return {
      theme,
      toggleTheme,
    };
  },
  {
    persist: {
      serializer: {
        deserialize: (value) => {
          const data = parse(value);

          if (data.theme === ThemeType.Dark) {
            document.documentElement.classList.toggle('dark', true);
          }

          return data;
        },
        serialize: stringify,
      },
    },
  },
);
