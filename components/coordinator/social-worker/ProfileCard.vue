<template>
  <div class="tw-max-w-xs tw-flex tw-flex-col tw-px-2">
    <div
      class="tw-flex tw-justify-center tw-items-center tw-gap-4 tw-rounded-sm tw-py-4 tw-px-2 tw-mb-4"
    >
      <fa-layers class="fa-4x tw-w-[30%] tw-justify-self-center">
        <fa class="" :icon="['fa', 'user-tie']" />
      </fa-layers>
      <div class="tw-w-[60%] tw-flex tw-flex-col tw-justify-center">
        <span class="tw-text-xl tw-font-bold">John Doe</span>
        <span class="tw-text-xs tw-text-gray-700">test@gmail.com</span>
      </div>
    </div>

    <div class="tw-flex tw-gap-5">
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label class="tw-text-sm tw-text-gray-800 tw-font-light">
          Gender
        </label>
        <v-text-field value="Male" dense outlined readonly></v-text-field>
      </div>
      <div class="tw-flex tw-flex-col tw-gap-1">
        <label class="tw-text-sm tw-text-gray-800 tw-font-light"> Age </label>
        <v-text-field value="30" dense outlined readonly></v-text-field>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-gap-1 -tw-mt-3">
      <label class="tw-text-sm tw-text-gray-800 tw-font-light">
        Phone Number
      </label>
      <v-text-field value="0987654321" dense outlined readonly></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialWorkerProfileCard',
}
</script>
