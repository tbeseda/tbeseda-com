import { jsx } from 'nano-jsx';

export default function Header({ data }) {
  const profile = data;

  return jsx/* html */ `
    <header class="flex flex-col gap-1 md:mb-12 mb-8 md:mt-14 mt-8 px-5 text-center">
      <div class="grid justify-center">
        <img alt="avatar" class="w-20 h-20 object-cover object-center rounded-full bg-gray-100"
            src="${profile.avatarUrl}" />
      </div>

      <h2 class="text-sm text-gray-400 font-semibold">
        <a href="${profile.url}" target="_blank">
          @<span class="uppercase tracking-widest font-bold text-begin-orange">
            ${profile.login}
          </span>
        </a>
      </h2>

      <div class="grid grid-flow-col auto-cols-auto gap-x-1 justify-center">
        <h1 class="text-5xl font-bold text-white">
          ${profile.name}
        </h1>
      </div>

      <h2 class="text-lg">
        Web Engineer, DX, & General Technologist
      </h2>

      <h3 class="text-base text-gray-400">
        Colorado Front Range
        (${profile.location})
        and all over the Internet.
      </h3>

      <div
        class="grid grid-flow-col auto-cols-auto gap-x-2 justify-center font-medium title-font tracking-wider text-sm mb-1">
        <span class="text-gray-200">Employed:</span>
        <span class="text-begin-coral">
          ${jsx([profile.companyHTML])}
        </span>
      </div>
    </header>
  `;
}
