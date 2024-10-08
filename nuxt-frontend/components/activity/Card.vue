<script setup lang="ts">
import type { Activity } from "../../../shared/types";
/**
 * Validate and define props for the ActivityCard component
 */
const props = defineProps({
  activity: {
    type: Object as () => Activity,
    required: true,
    validator: (value: Activity) => {
      return value && typeof value === "object" && "_id" in value;
    },
  },
});

const title = computed(() => {
  return {
    mainTitle: props.activity.title?.split(":")[0] || "",
    subTitle: props.activity.title?.split(":")[1] || "",
  };
});
</script>

<template>
  <div
    v-if="activity"
    class="w-full block shadow rounded-md border border-gray-300/50 hover:border-sky-500/50 hover:shadow-sm transition-all"
    data-testid="activity-card"
  >
    <div class="flex flex-col md:flex-row">
      <div class="w-100 md:w-4/12 relative">
        <ActivityRibbon
          v-if="activity.specialOffer"
          data-testid="special-offer-ribbon"
          >Offer!</ActivityRibbon
        >
        <!-- <NuxtImg
          :src="`activities/${activity._id}.png`"
          :alt="activity.title"
          class="h-[200px] w-full object-cover"
          placeholder
          loading="lazy"
        /> -->
        <NuxtImg
          src="/activities/placeholder-image.jpg"
          :alt="activity.title"
          class="h-[200px] w-full object-cover"
          placeholder
          loading="lazy"
        />
      </div>
      <div class="w-100 md:w-8/12 flex flex-col md:flex-row pb-4 md:pb-0">
        <div class="w-100 md:w-9/12 p-6 md:p-4 lg:p-6">
          <h2 class="text-lg mb-2 flex flex-wrap gap-1">
            <span class="font-bold flex"
              >{{ title.mainTitle }}
              <span v-if="title.subTitle">:</span>
            </span>
            <span>{{ title.subTitle }}</span>
          </h2>
          <BaseRating v-model="activity.rating" :max-stars="5" readonly />
          <div class="mt-4 text-sm font-semibold">
            Provided by {{ activity.supplier?.name }}
          </div>
          <div class="text-sm">
            from {{ activity.supplier?.city }}, {{ activity.supplier?.country }}
          </div>
        </div>
        <div
          class="w-100 md:w-3/12 flex justify-center items-center flex-col border-sky-800/30 gap-2 md:border-l px-6 md:px-0"
        >
          <div class="flex flex-row gap-2 md:gap-0 md:flex-col items-center">
            <span class="text-sm text-gray-600/70">From</span>
            <div class="text-2xl font-bold text-red-600">
              <span>
                {{ activity.currency }}
              </span>
              <span>{{ activity.price }}</span>
            </div>
            <span class="text-sm text-gray-600/70">Per person</span>
          </div>
          <NuxtLink
            :to="`activities/${activity._id}`"
            class="w-full md:w-auto block"
          >
            <BaseButton class="w-full">Details</BaseButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
