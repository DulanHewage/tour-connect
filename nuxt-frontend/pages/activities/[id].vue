<template>
  <div>
    <div>
      <div class="w-full relative">
        <NuxtImg
          :src="`activities/${activity?.id}.png`"
          :alt="activity?.title"
          class="w-full h-[400px] object-cover"
          placeholder
          v-if="activity?.id"
        />
        <div
          class="z-10 absolute bottom-0 left-0 bg-gradient-to-t from-black h-full w-full flex"
        >
          <div
            class="container absolute bottom-0 pb-6 justify-between flex flex-col md:flex-row gap-2"
          >
            <div
              class="max-w-full md:max-w-[calc(100vw/2)] flex flex-col gap-2"
            >
              <h1 class="text-white text-xl md:text-2xl font-bold">
                {{ activity?.title }}
              </h1>
              <BaseRating
                :model-value="activity?.rating || 0"
                :max-stars="5"
                readonly
              >
                <span class="text-white">
                  {{ activity?.rating }} out of 5
                </span>
              </BaseRating>
            </div>
            <div class="flex flex-row gap-2 items-center">
              <span class="text-sm md:text-base text-gray-600/70 text-white"
                >from / per person</span
              >
              <div class="flex items-center gap-1">
                <div class="text-2xl md:text-3xl font-bold text-red-600">
                  <span>
                    {{ activity?.currency }}
                  </span>
                  <span>{{ activity?.price }}</span>
                </div>
                <span
                  v-if="activity?.specialOffer"
                  class="font-bold text-white bg-red-600 px-1 py-0.5 rounded text-xs flex items-center mb-2"
                >
                  discounted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container h-[calc(100vh-400px)]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from "../../types";

const { params } = useRoute();
const { getActivityById } = useActivityService();

const activityId: number = parseInt(params.id as string);
const activity: Activity | undefined = await getActivityById(activityId);
</script>
