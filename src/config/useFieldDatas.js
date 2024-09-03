import { useState, useEffect } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "./api";
const useFieldDatas = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [professionList, setProfessionList] = useState([]);
  const [gendersList, setGendersList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [nationalitiesList, setNationalitiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const formdata = { type: "category" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          setCategoryList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const getFeaturesList = async () => {
      try {
        const formdata = { type: "features" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          setFeaturesList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const getByProfessionList = async () => {
      try {
        const formdata = { type: "profession" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          setProfessionList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const getGendersList = async () => {
      try {
        const formdata = { type: "genders" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          console.log(resData?.data?.data[0]?.features, "resData");
          setGendersList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const getLanguiagesList = async () => {
      try {
        const formdata = { type: "language" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          console.log(
            resData?.data?.data[0]?.features,
            "resData LANGUAGE_MAIN_GET"
          );
          setLanguagesList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const getNationalitiesList = async () => {
      try {
        const formdata = { type: "nationalities" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          console.log(resData?.data?.data[0]?.features, "resData");
          setNationalitiesList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getCategoryList();
    getFeaturesList();
    getByProfessionList();
    getGendersList();
    getLanguiagesList();
    getNationalitiesList();
  }, []);

  return {
    categoryList,
    featuresList,
    professionList,
    gendersList,
    languagesList,
    nationalitiesList,
  };
};

export default useFieldDatas;
