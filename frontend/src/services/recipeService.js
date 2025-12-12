import api from '../api';

const ENDPOINTS = {
    RECIPES: 'recipes/',
    COMPLETIONS: 'recipe_completions/'
}

export const getRecipeByUser = async (user) => {
    const { data } = await api.get(ENDPOINTS.BY_USER_ID, {
        params: { author: user.id },
    });
    return data
}

export const getRecipeByCourse = async (course) => {
    const { data } = await api.get(ENDPOINTS.RECIPES, { params: { course: course } });
    return data
}

export const getRecipeByCuisine = async (cuisine) => {
    const { data } = await api.get(ENDPOINTS.RECIPES, { params: { cuisine: cuisine } });
    return data;
}

export const getRecipesByTag = async (tag) => {
    const { data } = await api.get(ENDPOINTS.RECIPES, { params: { tag: tag } });
    return data;
}

export const searchRecipe = async (term) => {
    const { data } = await api.get(ENDPOINTS.RECIPES, {
        params: { term: term },
    });
    return data;
};

export const getCookedRecipes = async () => {
    const { data } = await api.get(ENDPOINTS.COMPLETIONS);
    return data;
}

export const getPopularRecipes = async () => {
    const { data } = await api.get(ENDPOINTS.RECIPES);
    return data;
}