package javasenior.backend.wrapper;

public class GenericWrapper<T> {

	private String errorMessage;
	private String errorCode;
	private T success;
	private long totalItems;

	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public String getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	public Object getSuccess() {
		return success;
	}
	public void setData(T success) {
		this.success = success;
	}
	public long getTotalItems() {
		return totalItems;
	}
	public void setTotalItems(long totalItems) {
		this.totalItems = totalItems;
	}
	@Override
	public String toString() {
		return "GenericWrapper [errorMessage=" + errorMessage + ", errorCode=" + errorCode + ", success=" + success
				+ "]";
	}	
}
