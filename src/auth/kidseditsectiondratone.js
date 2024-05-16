<div className="kids-main mt-4">
  <div className="kids-form-row">
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          Preferred First Name
          <span className="mandatory">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          value={kidsPreferedFirstName}
          onChange={(e) => {
            kidsPreferedFirstNameChange(e);
            setPreferedNameError(false);
          }}
          onKeyDown={handleKidsPrefferedFirstNameKeyPress}
          placeholder="Enter Preferred  First Name"
        ></input>
        {preferedNameError && (
          <div className="invalid-fields">
            Please Enter Preferred First Name
          </div>
        )}
        {kidsPrefferedFirstNameLetterError && (
          <div className="invalid-fields">Only Letters Allowed</div>
        )}
      </div>
    </div>
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">Preferred Last name</label>
        <input
          type="text"
          className="form-control"
          value={kidsPreferedLastName}
          onChange={(e) => {
            kidsPreferedLastNameChange(e);
          }}
          onKeyDown={handleKidsPrefferedLasttNameKeyPress}
          placeholder="Enter Preferred  Last name"
        ></input>
        {kidsPrefferedLastNameLetterError && (
          <div className="invalid-fields">Only Letters Allowed</div>
        )}
      </div>
    </div>
  </div>
  <div className="kids-form-row">
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          E-mail <span className="mandatory">*</span>
        </label>
        <input
          type="email"
          className={`form-control ${
            !isValidEmail ? "is-invalid" : "form-control"
          }`}
          onChange={handleEmailChange}
          placeholder="Enter E-mail"
          value={parentEmail}
        />
        {!isValidEmail && (
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        )}
        {parentEmailError && (
          <div className="invalid-fields">Please enter Email</div>
        )}
      </div>
    </div>
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          Country<span className="mandatory">*</span>
        </label>
        <Select
          placeholder="Search country..."
          options={countryList.map((country, index) => ({
            value: country,
            label: country,
            key: index,
          }))}
          value={{ value: country, label: country }}
          onChange={handleSelectedCountry}
          isSearchable={true}
        />
        {parentCountryError && (
          <div className="invalid-fields">Please Select Country</div>
        )}
      </div>
    </div>
  </div>
  <div className="kids-form-row">
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          State<span className="mandatory">*</span>
        </label>
        <Select
          placeholder="Select state..."
          options={stateList.map((state) => ({
            value: state.stateId, // or whatever unique identifier you want to use
            label: state.name,
          }))}
          value={{ value: state, label: state }}
          onChange={handleSelectedState}
          isSearchable={true}
        />
        {stateError && (
          <div className="invalid-fields">Please Select State</div>
        )}
      </div>
    </div>
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">City</label>
        <Select
          placeholder="Select City..."
          options={cityList.map((city) => ({
            value: city.cityId, // or whatever unique identifier you want to use
            label: city.name,
          }))}
          value={{ value: kidsCity, label: kidsCity }}
          onChange={handleSelectedCity}
          isSearchable={true}
        />
      </div>
    </div>
  </div>

  <div className="kids-form-row">
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          Gender <span className="mandatory">*</span>
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={selectGender}
          style={{ fontSize: "14px" }}
          value={gender}
        >
          <option value="" disabled selected>
            Select Gender
          </option>
          {gendersOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {genderError && (
          <div className="invalid-fields">Please Select Gender</div>
        )}
      </div>
    </div>
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          Marital Status <span className="mandatory">*</span>
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={selectMaritalStatus}
          value={maritalStatus}
          style={{ fontSize: "14px" }}
        >
          <option value="" disabled selected>
            Select Marital Status
          </option>
          <option defaultValue value="married">
            Married
          </option>
          <option value="unmarried">UnMarried</option>
        </select>
        {maritalError && (
          <div className="invalid-fields">Please Select Marital Status</div>
        )}
      </div>
    </div>
  </div>
  <div className="kids-form-row">
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          Ethnicity <span className="mandatory">*</span>
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={selectEthnicity}
          value={ethnicity}
          style={{ fontSize: "14px" }}
        >
          <option value="" disabled>
            Select Ethnicity
          </option>
          {ethnicityOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {ethnicityError && (
          <div className="invalid-fields">Please Select Ethnicity</div>
        )}
      </div>
    </div>
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          Nationality <span className="mandatory">*</span>
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={selectNationality}
          value={nationality}
          style={{ fontSize: "14px" }}
        >
          <option value="" disabled selected>
            Select Nationality
          </option>
          {nationalityOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {nationalityError && (
          <div className="invalid-fields">Please Select Nationality</div>
        )}
      </div>
    </div>
  </div>
  <div className="kids-form-row">
    <div className="kids-form-section">
      <label className="form-label">
        Date Of Birth <span className="mandatory">*</span>
      </label>
      <div className="mb-3">
        {/* <input
            type="date"
            className="form-control"
            value={dateOfBirth}
            onChange={(e) => {
              handleDateChange(e);
              setDobError(false);
            }}
            placeholder=""
          ></input> */}

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={dateOfBirth}
            onChange={(newValue) => {
              console.log(newValue, "newValue");
              handleDateChange(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            disableFuture
          />
        </LocalizationProvider>
        {dobError && (
          <div className="invalid-fields">Please Select Date Of Birth</div>
        )}
      </div>
    </div>
    <div className="kids-form-section">
      <div className="mb-3">
        <label className="form-label">
          Language <span className="mandatory">*</span>
        </label>
        <Select
          isMulti
          name="colors"
          options={languageOptions}
          valueField="value"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(value) => selectLanguage(value)}
          styles={customStylesProfession}
          value={selectedLanguageOptions}
        />
        {languageError && (
          <div className="invalid-fields">Please Select Language</div>
        )}
      </div>
    </div>
  </div>
  <div className="kids-form-row mb-3">
    <div className="kids-form-section">
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Address<span className="mandatory">*</span>
        </label>
        <textarea
          style={{ width: "715px" }}
          className="form-control address-textarea"
          id="exampleFormControlTextarea1"
          value={address}
          rows="3"
          onChange={(e) => {
            setAddress(e.target.value);
            setAddressError(false);
          }}
        ></textarea>
        {addressError && (
          <div className="invalid-fields">Please Enter Address</div>
        )}
      </div>
    </div>
    <div className="kids-form-section">
      <label className="form-label">
        Mobile No <span className="mandatory">*</span>
      </label>
      <div className="mb-3">
        {/* <input
            type="text"
            className="form-control"
            maxLength="15"
            pattern="[0-9]{10}"
            value={parentMobile}
            onChange={(e) => {
              handleMobileChange(e);
              setParentMobileError(false);
            }}
            placeholder=" Mobile No"
          ></input> */}

        <MuiPhoneNumber
          defaultCountry={"kh"}
          value={parentMobile}
          className="form-control"
          onChange={handleMobileChange}
        />

        {parentMobileError && (
          <div className="invalid-fields">Please enter Mobile Number</div>
        )}
        {mobileNumError && (
          <div className="invalid-fields">Only Numbers Allowed</div>
        )}
      </div>
    </div>
  </div>
  <div className="update-profile-flex">
    <Button
      onClick={() => basicDetailsUpdate()}
      className="edit-profileimg-btn"
      variant="text"
      style={{ textTransform: "capitalize" }}
    >
      Update
    </Button>
  </div>
</div>;
